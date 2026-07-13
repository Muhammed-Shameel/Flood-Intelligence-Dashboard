import React from 'react'
import { Github, Linkedin } from 'lucide-react'

export default function DeveloperProfile() {
  return (
    <div className="flex items-center gap-4 text-neutral">
      <div className="text-xs">
        <p className="font-semibold text-text-primary-light dark:text-text-primary">Muhammed Shameel</p>
        <p>Developer</p>
      </div>
      <div className="flex gap-3">
        <a href="https://github.com/Muhammed-Shameel" target="_blank" rel="noopener noreferrer" className="hover:text-blue transition-colors">
          <Github size={16} />
        </a>
        <a href="https://www.linkedin.com/in/muhammed-shameel" target="_blank" rel="noopener noreferrer" className="hover:text-blue transition-colors">
          <Linkedin size={16} />
        </a>
      </div>
    </div>
  )
}
