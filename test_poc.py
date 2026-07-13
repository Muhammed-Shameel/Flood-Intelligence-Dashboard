import os
import time
from datetime import datetime
from pathlib import Path
from typing import Callable, List

from selenium import webdriver
from selenium.common.exceptions import (
    ElementClickInterceptedException,
    NoSuchElementException,
    TimeoutException,
    WebDriverException,
)
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


BASE_URL = "https://flood-exposure-intelligence-board-msh6lgk1d-infocreonproject.vercel.app/"
REPORT_PATH = Path(__file__).with_name("Test_Report.txt")

MAP_SELECTOR = "[data-testid='flood-map']"
MARKER_SELECTOR = "[data-testid='flood-zone-marker']"
PANEL_SELECTOR = "[data-testid='intelligence-panel']"
INFO_BUTTON_SELECTOR = "[data-testid='info-button']"
INFO_DIALOG_SELECTOR = "[data-testid='info-dialog']"
CREATOR_NAME_XPATH = "//*[contains(normalize-space(.), 'Muhammed Shameel')]"
LEGACY_MAP_SELECTOR = ".leaflet-container"
LEGACY_MARKER_SELECTOR = ".leaflet-interactive"
LEGACY_PANEL_SELECTOR = "aside"
LEGACY_INFO_BUTTON_XPATH = "//button[normalize-space(.)='ⓘ']"


def write_report(results: List[dict]) -> None:
    passed = sum(1 for r in results if r['status'] == 'PASS')
    failed = sum(1 for r in results if r['status'] == 'FAIL')
    total = len(results)
    total_time = sum(float(r.get('time', 0)) for r in results)

    lines = [
        "======================================================================",
        "UAT TEST REPORT — Flood Intelligence Dashboard",
        "======================================================================",
        f"Target URL : {BASE_URL}",
        f"Run Time   : {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        "----------------------------------------------------------------------"
    ]
    for result in results:
        lines.append(f"[Test Case: {result['name']}]")
        lines.append(f"       Status : {result['status']}")
        lines.append(f"       Detail : {result['details']}")
        lines.append(f"       Time   : {result['time']:.2f}s")
        lines.append("----------------------------------------------------------------------")
    
    lines.append(f"SUMMARY: {passed} passed, {failed} failed, {total} total")
    lines.append(f"Total Time : {total_time:.2f}s")
    lines.append("======================================================================")
    
    REPORT_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")


def create_driver() -> webdriver.Chrome:
    options = Options()

    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    brave_path = r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"
    if Path(chrome_path).exists():
        options.binary_location = chrome_path
    elif Path(brave_path).exists():
        options.binary_location = brave_path

    options.add_argument("--window-size=1440,1200")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    if os.getenv("CI") == "true" or os.getenv("HEADLESS") == "1":
        options.add_argument("--headless=new")

    return webdriver.Chrome(options=options)


def first_visible(locator_options: List[tuple[str, str]]):
    def _predicate(driver: WebDriver) -> WebElement | bool:
        for by, value in locator_options:
            for element in driver.find_elements(by, value):
                if element.is_displayed():
                    return element
        return False

    return _predicate


def first_clickable(locator_options: List[tuple[str, str]]):
    def _predicate(driver: WebDriver) -> WebElement | bool:
        for by, value in locator_options:
            for element in driver.find_elements(by, value):
                if element.is_displayed() and element.is_enabled():
                    return element
        return False

    return _predicate


def wait_for_app(driver: WebDriver) -> WebDriverWait:
    wait = WebDriverWait(driver, 60)
    wait.until(lambda d: d.execute_script("return document.readyState") == "complete")
    if "vercel.com/login" in driver.current_url.lower() or driver.title.strip().lower() == "login - vercel":
        raise RuntimeError("Vercel login page opened instead of the flood intelligence application")
    wait.until(first_visible([
        (By.CSS_SELECTOR, MAP_SELECTOR),
        (By.CSS_SELECTOR, LEGACY_MAP_SELECTOR),
    ]))
    return wait


def test_page_load_and_map_visibility(driver: WebDriver) -> str:
    driver.get(BASE_URL)
    wait = wait_for_app(driver)
    wait.until(first_visible([
        (By.CSS_SELECTOR, MAP_SELECTOR),
        (By.CSS_SELECTOR, LEGACY_MAP_SELECTOR),
    ]))
    return "Header/Main structure visible"


def test_marker_click_and_intelligence_panel(driver: WebDriver) -> str:
    wait = wait_for_app(driver)
    marker = wait.until(first_clickable([
        (By.CSS_SELECTOR, MARKER_SELECTOR),
        (By.CSS_SELECTOR, LEGACY_MARKER_SELECTOR),
    ]))
    driver.execute_script("arguments[0].scrollIntoView({block: 'center', inline: 'center'});", marker)
    try:
        marker.click()
    except ElementClickInterceptedException:
        driver.execute_script(
            "arguments[0].dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));",
            marker,
        )
    wait.until(first_visible([
        (By.CSS_SELECTOR, PANEL_SELECTOR),
        (By.CSS_SELECTOR, LEGACY_PANEL_SELECTOR),
    ]))
    return "Intelligence Panel slid into view"


def test_information_modal_contains_name(driver: WebDriver) -> str:
    wait = wait_for_app(driver)
    wait.until(first_clickable([
        (By.CSS_SELECTOR, INFO_BUTTON_SELECTOR),
        (By.XPATH, LEGACY_INFO_BUTTON_XPATH),
    ])).click()
    wait.until(first_visible([
        (By.CSS_SELECTOR, INFO_DIALOG_SELECTOR),
        (By.XPATH, CREATOR_NAME_XPATH),
    ]))
    wait.until(EC.visibility_of_element_located((By.XPATH, CREATOR_NAME_XPATH)))
    return "Info popover opened and name verified"


def run_test_case(driver: WebDriver, name: str, action: Callable[[WebDriver], str]) -> dict:
    start_time = time.time()
    try:
        details = action(driver)
        return {"name": name, "status": "PASS", "details": details, "time": time.time() - start_time}
    except (TimeoutException, NoSuchElementException, ElementClickInterceptedException, WebDriverException, RuntimeError) as exc:
        details = str(exc).strip() or f"Timed out at URL: {driver.current_url}; title: {driver.title}"
        return {"name": name, "status": "FAIL", "details": details, "time": time.time() - start_time}


def main() -> None:
    results = []
    driver = None

    try:
        driver = create_driver()
        tests = [
            ("Visual Load", test_page_load_and_map_visibility),
            ("The Handshake", test_marker_click_and_intelligence_panel),
            ("The Signature", test_information_modal_contains_name),
        ]

        for name, action in tests:
            results.append(run_test_case(driver, name, action))
    except Exception as exc:
        results.append({"name": "Execution", "status": "FAIL", "details": str(exc).splitlines()[0], "time": 0.0})
    finally:
        write_report(results)
        if driver is not None:
            driver.quit()


if __name__ == "__main__":
    main()
