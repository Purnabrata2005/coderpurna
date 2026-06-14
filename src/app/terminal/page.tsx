'use client'

import React, { useEffect, useState, useRef } from 'react'
import Script from 'next/script'
import './terminal.css'

// Types for recursive splits
type PaneNode =
  | { type: 'terminal'; id: string }
  | { type: 'split'; direction: 'horizontal' | 'vertical'; left: PaneNode; right: PaneNode; splitPercentage: number }

interface TerminalState {
  id: string
  history: string[]
  historyIndex: number
  output: Array<{
    id: string
    text?: string
    html?: string
    type: 'command' | 'error' | 'info' | 'success' | 'welcome' | 'raw'
  }>
  isGameActive: boolean
  isMatrixActive: boolean
}

export default function TerminalPage() {
  const [terminalTheme, setTerminalTheme] = useState('default')
  const [layoutRoot, setLayoutRoot] = useState<PaneNode>({ type: 'terminal', id: 'term-main' })
  const [terminals, setTerminals] = useState<Record<string, TerminalState>>({
    'term-main': {
      id: 'term-main',
      history: [],
      historyIndex: -1,
      output: [],
      isGameActive: false,
      isMatrixActive: false,
    },
  })
  const [activeTerminalId, setActiveTerminalId] = useState('term-main')

  // Context Menu State
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; active: boolean; targetId: string } | null>(null)

  // Modal States
  const [themeModalOpen, setThemeModalOpen] = useState(false)
  const [projectsModalOpen, setProjectsModalOpen] = useState(false)
  const [skillsModalOpen, setSkillsModalOpen] = useState(false)

  // Drag resizing state
  const [resizing, setResizing] = useState<{
    leftNodeId: string
    rightNodeId: string
    parent: PaneNode
    direction: 'horizontal' | 'vertical'
    startX: number
    startY: number
    initialPercentage: number
  } | null>(null)

  // Projects data
  const projects = [
    {
      title: 'Interactive Terminal Resume',
      description: 'A unique terminal-based resume with interactive features, pane splitting, custom themes, and easter eggs.',
      image: '/image/social-cover.png',
      technologies: ['React', 'TypeScript', 'p5.js', 'Next.js', 'Vanilla CSS'],
      demo: 'https://marjoballabani.me/terminal',
      repo: 'https://github.com/marjoballabani/marjoballabani.github.io',
    },
    {
      title: 'coderarena',
      description: 'A terminal-based user interface for managing Firebase Firestore and Cloud Functions directly from the command line.',
      image: '/image/coderarena-logo.svg',
      technologies: ['Go', 'TUI', 'Firebase', 'Firestore'],
      demo: 'https://marjoballabani.github.io/coderarena/',
      repo: 'https://github.com/marjoballabani/coderarena',
    },
    {
      title: 'Hypergrep',
      description: 'A high-performance codebase search and intelligence engine designed specifically to help AI agents navigate code repositories.',
      image: '/image/avatar-gpt.png',
      technologies: ['Rust', 'AST Parsing', 'ripgrep', 'LSP'],
      demo: 'https://marjoballabani.github.io/hypergrep/',
      repo: 'https://github.com/marjoballabani/hypergrep',
    },
  ]

  // Skills data
  const skills = {
    programming: {
      TypeScript: 95,
      'Next.js': 95,
      'React.js': 95,
      'Node.js': 92,
      JavaScript: 98,
      'Tailwind CSS': 95,
    },
    cloud: {
      AWS: 85,
      Azure: 80,
    },
    databases: {
      MongoDB: 92,
      PostgreSQL: 88,
      Redis: 85,
    },
  }

  // Print initial welcome message on mount
  useEffect(() => {
    printWelcomeMessage('term-main')
  }, [])

  // Global mouse up for resizing and clicks outside
  useEffect(() => {
    const handleMouseUp = () => {
      if (resizing) setResizing(null)
    }

    const handleClickOutside = () => {
      if (contextMenu) setContextMenu(null)
    }

    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('click', handleClickOutside)
    }
  }, [resizing, contextMenu])

  // Resize move handler
  useEffect(() => {
    if (!resizing) return

    const handleMouseMove = (e: MouseEvent) => {
      const container = document.querySelector('.terminal-container')
      if (!container) return
      const rect = container.getBoundingClientRect()

      let delta = 0
      let totalSize = 0

      if (resizing.direction === 'horizontal') {
        delta = e.clientX - resizing.startX
        totalSize = rect.width
      } else {
        delta = e.clientY - resizing.startY
        totalSize = rect.height
      }

      const percentageDelta = (delta / totalSize) * 100
      const newPercentage = Math.min(90, Math.max(10, resizing.initialPercentage + percentageDelta))

      // Update node split percentage
      const updatePercentage = (node: PaneNode): PaneNode => {
        if (node.type === 'split') {
          if (node === resizing.parent) {
            return { ...node, splitPercentage: newPercentage }
          }
          return {
            ...node,
            left: updatePercentage(node.left),
            right: updatePercentage(node.right),
          }
        }
        return node
      }

      setLayoutRoot((prev) => updatePercentage(prev))
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [resizing])

  // Helper text coloring
  const wrapColor = (text: string, color: string) => {
    return `<span style="color: ${color}">${text}</span>`
  }

  const printWelcomeMessage = (id: string) => {
    const asciiArt = `██████╗ ██╗   ██╗██████╗ ███╗   ██╗ █████╗ 
██╔══██╗██║   ██║██╔══██╗████╗  ██║██╔══██╗
██████╔╝██║   ██║██████╔╝██╔██╗ ██║███████║
██╔═══╝ ██║   ██║██╔══██╗██║╚██╗██║██╔══██║
██║     ╚██████╔╝██║  ██║██║ ╚████║██║  ██║
╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝`

    const divider = '─────────────────────────────────────────────────'

    const welcome =
      wrapColor(asciiArt + '\n', '#d4843e') +
      wrapColor(divider + '\n', '#555555') +
      wrapColor('              Interactive Terminal Resume\n', '#888888') +
      wrapColor('         Full-Stack Engineer • Next.js & React Developer\n', '#666666') +
      wrapColor(divider + '\n\n', '#555555') +
      wrapColor('Type ', '#666666') +
      wrapColor("'help'", '#98fb98') +
      wrapColor(' to see available commands\n', '#666666') +
      wrapColor('Press ', '#666666') +
      wrapColor("'tab'", '#98fb98') +
      wrapColor(' to auto-complete commands', '#666666')

    setTerminals((prev) => {
      const term = prev[id]
      if (!term) return prev
      return {
        ...prev,
        [id]: {
          ...term,
          output: [...term.output, { id: `welcome-${Date.now()}`, html: welcome, type: 'welcome' }],
        },
      }
    })
  }

  // Handle Command Submission
  const handleCommand = async (id: string, commandText: string) => {
    const command = commandText.trim().toLowerCase()
    const [cmd, ...args] = command.split(' ')

    setTerminals((prev) => {
      const term = prev[id]
      if (!term) return prev
      return {
        ...prev,
        [id]: {
          ...term,
          history: [...term.history, commandText],
          historyIndex: -1,
          output: [...term.output, { id: `cmd-${Date.now()}`, text: `➜ ${commandText}`, type: 'command' }],
        },
      }
    })

    if (!cmd) return

    // Execute logic based on command
    switch (cmd) {
      case 'help':
        showHelp(id)
        break
      case 'about':
        showAbout(id)
        break
      case 'skills':
        showSkills(id)
        break
      case 'experience':
        showExperience(id)
        break
      case 'education':
        showEducation(id)
        break
      case 'contact':
        showContact(id)
        break
      case 'clear':
        setTerminals((prev) => {
          const term = prev[id]
          if (!term) return prev
          return {
            ...prev,
            [id]: { ...term, output: [] },
          }
        })
        printWelcomeMessage(id)
        break
      case 'projects':
        setProjectsModalOpen(true)
        printOutput(id, 'Opening Projects modal...', 'info')
        break
      case 'skills-visual':
        setSkillsModalOpen(true)
        printOutput(id, 'Opening Skills Visualization modal...', 'info')
        break
      case 'game':
        startGame(id)
        break
      case 'exit-game':
        endGame(id)
        break
      case 'matrix':
        startMatrix(id)
        break
      case 'stop-matrix':
        stopMatrix(id)
        break
      case 'weather':
        await showWeather(id, args.join(' '))
        break
      case 'calc':
      case 'calculate':
        calculate(id, args.join(' '))
        break
      case 'pdf':
        printOutput(id, 'Generating PDF resume...', 'info')
        setTimeout(() => {
          printOutput(id, 'Direct PDF downloads are temporarily disabled in the sandboxed preview. Visit the LinkedIn profile to download my complete CV.', 'error')
        }, 800)
        break
      case 'linkedin-cover':
        showLinkedInCover(id)
        break
      default:
        printOutput(id, `Command not found: ${command}. Type 'help' for available commands.`, 'error')
    }
  }

  // Print output line helper
  const printOutput = (id: string, text: string, type: 'command' | 'error' | 'info' | 'success' | 'welcome' | 'raw', html?: string) => {
    setTerminals((prev) => {
      const term = prev[id]
      if (!term) return prev
      return {
        ...prev,
        [id]: {
          ...term,
          output: [...term.output, { id: `${type}-${Date.now()}-${Math.random()}`, text, html, type }],
        },
      }
    })
  }

  // Commands Implementation
  const showHelp = (id: string) => {
    const title = wrapColor('🚀 Available Commands\n\n', '#ffff00')

    const mainCommands =
      wrapColor('Main Commands:\n', '#00ffff') +
      wrapColor('• help', '#98fb98') +
      '       ' +
      wrapColor('Show this help message\n', '#ffffff') +
      wrapColor('• about', '#98fb98') +
      '      ' +
      wrapColor('Display my professional summary\n', '#ffffff') +
      wrapColor('• skills', '#98fb98') +
      '     ' +
      wrapColor('View my technical expertise\n', '#ffffff') +
      wrapColor('• experience', '#98fb98') +
      ' ' +
      wrapColor('Show my work history\n', '#ffffff') +
      wrapColor('• education', '#98fb98') +
      '  ' +
      wrapColor('View my educational background\n', '#ffffff') +
      wrapColor('• contact', '#98fb98') +
      '    ' +
      wrapColor('Get my contact information\n', '#ffffff') +
      wrapColor('• clear', '#98fb98') +
      '      ' +
      wrapColor('Clear the terminal screen\n', '#ffffff')

    const utilityCommands =
      '\n' +
      wrapColor('Utility Commands:\n', '#00ffff') +
      wrapColor('• projects', '#98fb98') +
      '   ' +
      wrapColor('View my project showcase\n', '#ffffff') +
      wrapColor('• skills-visual', '#98fb98') +
      ' ' +
      wrapColor('Show skills visualization\n', '#ffffff') +
      wrapColor('• game', '#98fb98') +
      '      ' +
      wrapColor('Play mini-game Snake (Use Arrow keys, Space, ESC)\n', '#ffffff') +
      wrapColor('• matrix', '#98fb98') +
      '    ' +
      wrapColor('Start Matrix digital rain effect\n', '#ffffff') +
      wrapColor('• weather', '#98fb98') +
      '   ' +
      wrapColor('Check weather: weather [city name]\n', '#ffffff') +
      wrapColor('• calc', '#98fb98') +
      '      ' +
      wrapColor('Evaluate math: calc [expression]\n', '#ffffff') +
      wrapColor('• pdf', '#98fb98') +
      '       ' +
      wrapColor('Download resume as PDF\n', '#ffffff') +
      wrapColor('• linkedin-cover', '#98fb98') +
      ' ' +
      wrapColor('Generate LinkedIn cover banner\n', '#ffffff')

    const shortcuts =
      '\n' +
      wrapColor('Shortcuts:\n', '#666666') +
      wrapColor('• ', '#666666') +
      wrapColor('↑/↓', '#666666') +
      '         ' +
      wrapColor('Navigate command history\n', '#444444') +
      wrapColor('• ', '#666666') +
      wrapColor('Tab', '#666666') +
      '         ' +
      wrapColor('Auto-complete commands\n', '#444444') +
      wrapColor('• ', '#666666') +
      wrapColor('Ctrl+L', '#666666') +
      '      ' +
      wrapColor('Clear the screen\n', '#444444') +
      wrapColor('• ', '#666666') +
      wrapColor('Ctrl+Shift+H', '#666666') +
      ' ' +
      wrapColor('Split screen horizontally\n', '#444444') +
      wrapColor('• ', '#666666') +
      wrapColor('Ctrl+Shift+V', '#666666') +
      ' ' +
      wrapColor('Split screen vertically', '#444444')

    printOutput(id, '', 'raw', title + mainCommands + utilityCommands + shortcuts)
  }

  const showAbout = (id: string) => {
    const summary =
      wrapColor('✨ About Me\n\n', '#ff8c00') +
      wrapColor('┌─────────────────────────────────────────────────────────┐\n', '#ff8c00') +
      wrapColor('│', '#ff8c00') +
      wrapColor(' Full-Stack Engineer with more than 4 years of            ', '#ffffff') +
      wrapColor('│\n', '#ff8c00') +
      wrapColor('│', '#ff8c00') +
      wrapColor(' programming experience.                                  ', '#ffffff') +
      wrapColor('│\n', '#ff8c00') +
      wrapColor('└─────────────────────────────────────────────────────────┘\n\n', '#ff8c00') +
      wrapColor('⚡ Experience\n', '#ff8c00') +
      wrapColor('   Building scalable and efficient software solutions using\n', '#ffffff') +
      wrapColor('   React, JavaScript, and Google Cloud\n\n', '#ff8c00') +
      wrapColor('⚡ Passion\n', '#ff8c00') +
      wrapColor('   Transforming innovative ideas into high-quality applications\n', '#ffffff') +
      wrapColor('   with elegant and efficient implementations\n\n', '#ffffff') +
      wrapColor('⚡ Strengths\n', '#ff8c00') +
      wrapColor('   Strong team player with expertise in designing robust,\n', '#ffffff') +
      wrapColor('   high-performance systems\n\n', '#ffffff') +
      wrapColor('╭───────────────────────────────────────────────────────╮\n', '#ff8c00') +
      wrapColor('│', '#ff8c00') +
      wrapColor(' Ready to bring your innovative ideas to life!          ', '#ffffff') +
      wrapColor('│\n', '#ff8c00') +
      wrapColor('╰───────────────────────────────────────────────────────╯', '#ff8c00')

    printOutput(id, '', 'raw', summary)
  }

  const showSkills = (id: string) => {
    const skillsText =
      wrapColor('🛠️ Technical Expertise\n\n', '#ffff00') +
      '• ' +
      wrapColor('Languages: ', '#00ffff') +
      'JavaScript, TypeScript, Kotlin, Java, SQL, HTML, CSS\n' +
      '• ' +
      wrapColor('Frontend: ', '#00ffff') +
      'Next.js, Tailwind CSS, React.js, Redux, MobX, Angular, Bootstrap, Material-UI, React Native, Ionic\n' +
      '• ' +
      wrapColor('Backend: ', '#00ffff') +
      'Node.js, Express.js, Hapi, Cloud Functions, AWS Lambda, Nginx\n' +
      '• ' +
      wrapColor('Cloud & DevOps: ', '#00ffff') +
      'AWS, Azure, Docker, Kubernetes, Terraform\n' +
      '• ' +
      wrapColor('Databases: ', '#00ffff') +
      'MongoDB, Firestore, Firebase Realtime Database, RethinkDB, PostgreSQL, BigQuery, Redis\n' +
      '• ' +
      wrapColor('Architecture: ', '#00ffff') +
      'Microservices, SaaS, Pub/Sub Messaging, Routing Slips, Dead Letter Queues\n' +
      '• ' +
      wrapColor('Tools & Methods: ', '#00ffff') +
      'Git, Elasticsearch, GraphQL, Pandas, Jest, Cypress, JIRA, Agile/Scrum, CI/CD, TDD'

    printOutput(id, '', 'raw', skillsText)
  }

  const showExperience = (id: string) => {
    const expText =
      wrapColor('💼 Professional Experience\n\n', '#ffff00') +
      wrapColor('CODERARENA | Full-Stack Engineer & Creator\n', '#00ffff') +
      wrapColor('2020 - Present | Digha, West Bengal, India\n', '#ffffff') +
      '• Built and launched CoderArena, a complete coding practice platform featuring interactive coding challenges,\n' +
      '  interview preparation paths, structured editorial solutions, and progress analytics.\n' +
      '• Engineered high-performance compilers/interpreters and scalable web infrastructure.\n' +
      wrapColor('Stack: Next.js, Tailwind CSS, React, Node.js, TypeScript, JavaScript, Docker', '#87cefa')

    printOutput(id, '', 'raw', expText)
  }

  const showEducation = (id: string) => {
    const eduText =
      wrapColor('🎓 Education\n\n', '#ff8c00') +
      wrapColor('Bachelor\'s Degree in Computer Science\n', '#ffffff') +
      'University of Tirana • Tirana, Albania (2013 - 2016)'

    printOutput(id, '', 'raw', eduText)
  }

  const showContact = (id: string) => {
    const contactText =
      wrapColor('📫 Contact Information\n\n', '#ff8c00') +
      '• ' +
      wrapColor('Email: ', '#ff8c00') +
      '<a href="mailto:deypurnabrata@gmail.com" style="color:#ffffff;text-decoration:underline;">deypurnabrata@gmail.com</a>\n' +
      '• ' +
      wrapColor('LinkedIn: ', '#ff8c00') +
      '<a href="https://linkedin.com/in/purnabrata-dey-15018a369" target="_blank" style="color:#ffffff;text-decoration:underline;">linkedin.com/in/purnabrata-dey-15018a369</a>\n' +
      '• ' +
      wrapColor('GitHub: ', '#ff8c00') +
      '<a href="https://github.com/Purnabrata2005" target="_blank" style="color:#ffffff;text-decoration:underline;">github.com/Purnabrata2005</a>\n' +
      '• ' +
      wrapColor('Twitter / X: ', '#ff8c00') +
      '<a href="https://x.com/purnabrata2005" target="_blank" style="color:#ffffff;text-decoration:underline;">@purnabrata2005</a>'

    printOutput(id, '', 'raw', contactText)
  }

  // Weather Command Implementation
  const showWeather = async (id: string, location: string) => {
    if (!location) {
      printOutput(id, 'Please specify a city. Usage: weather [city name]', 'error')
      return
    }

    printOutput(id, `Fetching weather for ${location}...`, 'info')

    try {
      const apiKey = '4331a27995f4c5b5e8d1eab1ed3d88b4'
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`
      const res = await fetch(url)

      if (!res.ok) {
        throw new Error(`Location not found: ${res.statusText}`)
      }

      const data = await res.json()

      const html = `<div class="weather-container">
        <div class="weather-header">
          <span style="color:#ffff00;font-weight:bold;">🌤️ Weather for ${data.name}, ${data.sys.country}</span>
        </div>
        <div class="weather-body">
          <div class="weather-main" style="display:flex;flex-direction:column;margin-bottom:10px;">
            <span style="font-size:2rem;color:#ffffff;font-weight:bold;">${Math.round(data.main.temp)}°C</span>
            <span style="color:#cccccc;">${data.weather[0].main} - ${data.weather[0].description}</span>
          </div>
          <div class="weather-details" style="font-size:0.95rem;">
            <div><span style="color:#87cefa;">Feels like:</span> ${Math.round(data.main.feels_like)}°C</div>
            <div><span style="color:#87cefa;">Humidity:</span> ${data.main.humidity}%</div>
            <div><span style="color:#87cefa;">Wind:</span> ${Math.round(data.wind.speed * 3.6)} km/h</div>
          </div>
        </div>
      </div>`

      printOutput(id, '', 'raw', html)
    } catch (e: any) {
      printOutput(id, `Weather fetch failed: ${e.message}`, 'error')
    }
  }

  // Calculator Command Implementation
  const calculate = (id: string, expression: string) => {
    if (!expression) {
      printOutput(id, 'Please enter a math expression. Usage: calc [expression]', 'error')
      return
    }

    try {
      // Sanitize expression
      const sanitized = expression.replace(/[^0-9+\-*/().%\s]/g, '')
      const result = eval(sanitized)

      if (isNaN(result) || !isFinite(result)) {
        throw new Error('Arithmetic error')
      }

      const html = `<div class="calculation" style="font-family:'Fira Code', monospace;margin: 5px 0;">
        <div class="calculation-expression" style="color:#87cefa;">${expression}</div>
        <div class="calculation-result" style="color:#98fb98;font-weight:bold;">= ${result}</div>
      </div>`

      printOutput(id, '', 'raw', html)
    } catch (err) {
      printOutput(id, 'Invalid calculation expression.', 'error')
    }
  }

  // LinkedIn cover mockup helper
  const showLinkedInCover = (id: string) => {
    const html = `<div style="width:100%;background-color:#1e1e2e;border:1px solid #555555;border-radius:8px;padding:20px;box-sizing:border-box;margin-top:10px;">
      <div style="display:flex;gap:5px;margin-bottom:15px;">
        <span style="width:10px;height:10px;border-radius:50%;background-color:#ff5f56;"></span>
        <span style="width:10px;height:10px;border-radius:50%;background-color:#ffbd2e;"></span>
        <span style="width:10px;height:10px;border-radius:50%;background-color:#27c93f;"></span>
      </div>
      <pre style="color:#d4843e;font-size:9px;line-height:1.1;margin:0;font-family:'Fira Code', monospace;">
██████╗ ██╗   ██╗██████╗ ███╗   ██╗ █████╗ 
██╔══██╗██║   ██║██╔══██╗████╗  ██║██╔══██╗
██████╔╝██║   ██║██████╔╝██╔██╗ ██║███████║
██╔═══╝ ██║   ██║██╔══██╗██║╚██╗██║██╔══██║
██║     ╚██████╔╝██║  ██║██║ ╚████║██║  ██║
╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝
      </pre>
      <div style="width:100%;height:1px;background-color:#333;margin:10px 0;"></div>
      <div style="font-size:13px;color:#ffffff;text-align:center;font-weight:bold;">Purnabrata Dey</div>
      <div style="font-size:10px;color:#888888;text-align:center;">Full-Stack Engineer • Next.js & React Developer</div>
    </div>`
    printOutput(id, '', 'raw', html)
  }

  // Tab Completion autocomplete
  const handleTabCompletion = (id: string, inputVal: string): string => {
    const currentInput = inputVal.toLowerCase().trim()
    const commands = [
      'help',
      'about',
      'skills',
      'experience',
      'education',
      'contact',
      'clear',
      'projects',
      'skills-visual',
      'game',
      'exit-game',
      'matrix',
      'stop-matrix',
      'weather',
      'calc',
      'pdf',
      'linkedin-cover',
    ]

    const matches = commands.filter((cmd) => cmd.startsWith(currentInput))

    if (matches.length === 1) {
      return matches[0]
    } else if (matches.length > 1 && currentInput) {
      const list = `\nPossible commands:\n${matches.join('  ')}`
      printOutput(id, list, 'info')
    }
    return inputVal
  }

  // Pane Splitting Layout functions
  const splitPane = (id: string, direction: 'horizontal' | 'vertical') => {
    const newTermId = `term-${Date.now()}`

    setTerminals((prev) => ({
      ...prev,
      [newTermId]: {
        id: newTermId,
        history: [],
        historyIndex: -1,
        output: [],
        isGameActive: false,
        isMatrixActive: false,
      },
    }))

    const updateLayout = (node: PaneNode): PaneNode => {
      if (node.type === 'terminal' && node.id === id) {
        return {
          type: 'split',
          direction,
          splitPercentage: 50,
          left: { type: 'terminal', id },
          right: { type: 'terminal', id: newTermId },
        }
      }
      if (node.type === 'split') {
        return {
          ...node,
          left: updateLayout(node.left),
          right: updateLayout(node.right),
        }
      }
      return node
    }

    setLayoutRoot((prev) => updateLayout(prev))
    setTimeout(() => {
      printWelcomeMessage(newTermId)
      setActiveTerminalId(newTermId)
      const input = document.getElementById(`input-${newTermId}`)
      if (input) input.focus()
    }, 100)
  }

  const closePane = (id: string) => {
    if (id === 'term-main' && layoutRoot.type === 'terminal') {
      return // Don't close the last terminal
    }

    // Traverse tree to remove terminal leaf and replace parent split with the sibling leaf
    const removeNode = (node: PaneNode): PaneNode => {
      if (node.type === 'split') {
        if (node.left.type === 'terminal' && node.left.id === id) {
          return node.right
        }
        if (node.right.type === 'terminal' && node.right.id === id) {
          return node.left
        }
        return {
          ...node,
          left: removeNode(node.left),
          right: removeNode(node.right),
        }
      }
      return node
    }

    setLayoutRoot((prev) => removeNode(prev))

    setTerminals((prev) => {
      const copy = { ...prev }
      delete copy[id]
      return copy
    })

    // Focus main terminal as fallback
    setTimeout(() => {
      setActiveTerminalId('term-main')
      const input = document.getElementById('input-term-main')
      if (input) input.focus()
    }, 100)
  }

  // Keyboard Navigation History (ArrowUp/Down)
  const navigateHistory = (id: string, direction: 'up' | 'down', currentVal: string): string => {
    const term = terminals[id]
    if (!term || term.history.length === 0) return currentVal

    let newIdx = term.historyIndex
    if (direction === 'up' && newIdx < term.history.length - 1) {
      newIdx++
    } else if (direction === 'down' && newIdx > -1) {
      newIdx--
    }

    setTerminals((prev) => ({
      ...prev,
      [id]: { ...prev[id], historyIndex: newIdx },
    }))

    if (newIdx >= 0 && newIdx < term.history.length) {
      return term.history[term.history.length - 1 - newIdx]
    }
    return ''
  }

  // Context Menu handlers
  const handleContextMenu = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      active: true,
      targetId: id,
    })
  }

  // Game Engine (Snake) using HTML5 canvas inside component for stability
  const [activeGameId, setActiveGameId] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const gameStateRef = useRef<{
    snake: Array<{ x: number; y: number }>
    direction: { x: number; y: number }
    nextDirection: { x: number; y: number }
    food: { x: number; y: number }
    score: number
    gameOver: boolean
    paused: boolean
    speed: number
  } | null>(null)

  const startGame = (id: string) => {
    // End any active game
    if (activeGameId) endGame(activeGameId)

    setActiveGameId(id)
    setTerminals((prev) => ({
      ...prev,
      [id]: { ...prev[id], isGameActive: true, isMatrixActive: false },
    }))

    gameStateRef.current = {
      snake: [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 },
      ],
      direction: { x: 1, y: 0 },
      nextDirection: { x: 1, y: 0 },
      food: { x: 8, y: 8 },
      score: 0,
      gameOver: false,
      paused: false,
      speed: 10,
    }
  }

  const endGame = (id: string) => {
    setActiveGameId(null)
    setTerminals((prev) => {
      const term = prev[id]
      if (!term) return prev
      return {
        ...prev,
        [id]: { ...term, isGameActive: false },
      }
    })
    gameStateRef.current = null
  }

  // Snake loop logic
  useEffect(() => {
    if (!activeGameId || !gameStateRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const gridSize = 15
    const cols = Math.floor(canvas.width / gridSize)
    const rows = Math.floor(canvas.height / gridSize)

    let lastTick = 0

    const placeFood = (state: any) => {
      let valid = false
      while (!valid) {
        state.food = {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows),
        }
        valid = !state.snake.some((s: any) => s.x === state.food.x && s.y === state.food.y)
      }
    }

    const gameLoop = (timestamp: number) => {
      if (!gameStateRef.current || activeGameId === null) return

      const state = gameStateRef.current
      requestAnimationFrame(gameLoop)

      const interval = 1000 / state.speed
      if (timestamp - lastTick < interval) return
      lastTick = timestamp

      if (state.gameOver || state.paused) {
        // Render screen state
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = state.gameOver ? '#ff6b6b' : '#ffffff'
        ctx.font = "bold 20px 'Fira Code', monospace"
        ctx.textAlign = 'center'
        ctx.fillText(state.gameOver ? 'GAME OVER' : 'PAUSED', canvas.width / 2, canvas.height / 2 - 10)

        ctx.font = "14px 'Fira Code', monospace"
        ctx.fillStyle = '#aaaaaa'
        ctx.fillText(state.gameOver ? 'Press SPACE to restart' : 'Press P to resume', canvas.width / 2, canvas.height / 2 + 20)
        ctx.fillText('Press ESC to exit', canvas.width / 2, canvas.height / 2 + 40)
        return
      }

      // Update snake position
      state.direction = state.nextDirection
      const head = {
        x: state.snake[0].x + state.direction.x,
        y: state.snake[0].y + state.direction.y,
      }

      // Wrap edges
      if (head.x < 0) head.x = cols - 1
      if (head.x >= cols) head.x = 0
      if (head.y < 0) head.y = rows - 1
      if (head.y >= rows) head.y = 0

      // Collision checks
      if (state.snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        state.gameOver = true
        return
      }

      state.snake.unshift(head)

      // Food check
      if (head.x === state.food.x && head.y === state.food.y) {
        state.score += 10
        placeFood(state)
        state.speed = Math.min(22, state.speed + 0.5)
      } else {
        state.snake.pop()
      }

      // Draw game
      ctx.fillStyle = '#111111'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = '#222222'
      ctx.lineWidth = 0.5
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw Food
      ctx.fillStyle = '#ff5f56'
      ctx.beginPath()
      ctx.arc(state.food.x * gridSize + gridSize / 2, state.food.y * gridSize + gridSize / 2, gridSize * 0.4, 0, Math.PI * 2)
      ctx.fill()

      // Draw Snake
      ctx.fillStyle = '#27c93f'
      state.snake.forEach((seg, idx) => {
        if (idx === 0) ctx.fillStyle = '#22a634' // head color
        else ctx.fillStyle = '#27c93f'
        ctx.fillRect(seg.x * gridSize + 1, seg.y * gridSize + 1, gridSize - 2, gridSize - 2)
      })

      // Score board update
      const scoreElement = document.getElementById('snake-game-score')
      if (scoreElement) scoreElement.textContent = `Score: ${state.score}`
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const state = gameStateRef.current
      if (!state) return

      if (e.key === 'ArrowUp' && state.direction.y !== 1) {
        state.nextDirection = { x: 0, y: -1 }
        e.preventDefault()
      } else if (e.key === 'ArrowDown' && state.direction.y !== -1) {
        state.nextDirection = { x: 0, y: 1 }
        e.preventDefault()
      } else if (e.key === 'ArrowLeft' && state.direction.x !== 1) {
        state.nextDirection = { x: -1, y: 0 }
        e.preventDefault()
      } else if (e.key === 'ArrowRight' && state.direction.x !== -1) {
        state.nextDirection = { x: 1, y: 0 }
        e.preventDefault()
      } else if (e.key === 'p' || e.key === 'P') {
        state.paused = !state.paused
      } else if (e.key === ' ' && state.gameOver) {
        // Space to restart
        state.snake = [
          { x: 5, y: 5 },
          { x: 4, y: 5 },
          { x: 3, y: 5 },
        ]
        state.direction = { x: 1, y: 0 }
        state.nextDirection = { x: 1, y: 0 }
        state.score = 0
        state.gameOver = false
        state.speed = 10
        placeFood(state)
      } else if (e.key === 'Escape') {
        endGame(activeGameId)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    requestAnimationFrame(gameLoop)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeGameId])

  // Matrix Digital Rain effect
  const [activeMatrixId, setActiveMatrixId] = useState<string | null>(null)
  const matrixCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const startMatrix = (id: string) => {
    if (activeMatrixId) stopMatrix(activeMatrixId)

    setActiveMatrixId(id)
    setTerminals((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMatrixActive: true, isGameActive: false },
    }))
  }

  const stopMatrix = (id: string) => {
    setActiveMatrixId(null)
    setTerminals((prev) => {
      const term = prev[id]
      if (!term) return prev
      return {
        ...prev,
        [id]: { ...term, isMatrixActive: false },
      }
    })
  }

  // Matrix Canvas Render loop
  useEffect(() => {
    if (!activeMatrixId) return

    const canvas = matrixCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.parentElement?.offsetWidth || 500
    canvas.height = 300

    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%#&_()[]{}<>'
    const fontSize = 14
    const cols = Math.floor(canvas.width / fontSize)
    const drops = Array(cols).fill(0).map(() => Math.floor(Math.random() * -30))

    const getGreenThemeColor = () => {
      switch (terminalTheme) {
        case 'dracula':
          return '#50fa7b'
        case 'solarized':
          return '#859900'
        case 'nord':
          return '#a3be8c'
        default:
          return '#00ff00'
      }
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = getGreenThemeColor()
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)
    return () => clearInterval(interval)
  }, [activeMatrixId, terminalTheme])

  // Recursive pane renderer JSX
  const renderPane = (node: PaneNode): React.ReactNode => {
    if (node.type === 'terminal') {
      const state = terminals[node.id]
      if (!state) return null

      return (
        <div
          className={`terminal-content ${activeTerminalId === node.id ? 'active-focus' : ''}`}
          onContextMenu={(e) => handleContextMenu(e, node.id)}
          onClick={() => setActiveTerminalId(node.id)}
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          {/* Output lines */}
          <div style={{ flex: 1, overflowY: 'auto' }} className="terminal-output-wrapper">
            <div id={`output-${node.id}`}>
              {state.output.map((line) => {
                if (line.html) {
                  return <div key={line.id} dangerouslySetInnerHTML={{ __html: line.html }} />
                }
                return (
                  <div key={line.id} className={line.type} style={{ whiteSpace: 'pre-wrap' }}>
                    {line.text}
                  </div>
                )
              })}

              {/* Matrix rain Canvas mounting */}
              {state.isMatrixActive && activeMatrixId === node.id && (
                <div id="matrix-container" className="matrix-container" style={{ position: 'relative', height: '300px', margin: '15px 0' }}>
                  <canvas ref={matrixCanvasRef} style={{ width: '100%', height: '300px', background: '#000' }} />
                  <div className="matrix-instructions" style={{ position: 'absolute', bottom: '10px', right: '15px', color: '#ff8c00', fontSize: '10px' }}>
                    Type 'stop-matrix' to exit
                  </div>
                </div>
              )}

              {/* Snake Game canvas mounting */}
              {state.isGameActive && activeGameId === node.id && (
                <div id="snake-game-container" className="game-container" style={{ margin: '15px 0', padding: '15px', border: '1px solid var(--border-color)', background: '#000' }}>
                  <div className="game-instructions" style={{ marginBottom: '10px', fontSize: '12px', color: 'var(--text-dim)' }}>
                    <p>Snake Game: Use Arrow Keys to move.</p>
                    <p>Press P to pause, SPACE to restart, ESC to exit.</p>
                  </div>
                  <div id="snake-game-score" style={{ fontWeight: 'bold', color: '#ffff00', marginBottom: '8px' }}>Score: 0</div>
                  <canvas ref={canvasRef} width={380} height={260} style={{ display: 'block', background: '#111', margin: '0 auto' }} />
                </div>
              )}
            </div>
          </div>

          {/* Prompt line */}
          <div className="input-line">
            <span className="prompt">➜</span>
            <input
              type="text"
              id={`input-${node.id}`}
              className="command-input"
              autoFocus={activeTerminalId === node.id}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = e.currentTarget.value
                  e.currentTarget.value = ''
                  handleCommand(node.id, val)
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  e.currentTarget.value = navigateHistory(node.id, 'up', e.currentTarget.value)
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  e.currentTarget.value = navigateHistory(node.id, 'down', e.currentTarget.value)
                } else if (e.key === 'Tab') {
                  e.preventDefault()
                  e.currentTarget.value = handleTabCompletion(node.id, e.currentTarget.value)
                }
              }}
            />
          </div>
        </div>
      )
    } else {
      const splitDir = node.direction === 'horizontal' ? 'row' : 'column'
      const handleClass = node.direction === 'horizontal' ? 'horizontal' : 'vertical'

      const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault()
        setResizing({
          leftNodeId: (node.left as any).id || '',
          rightNodeId: (node.right as any).id || '',
          parent: node,
          direction: node.direction,
          startX: e.clientX,
          startY: e.clientY,
          initialPercentage: node.splitPercentage,
        })
      }

      return (
        <div
          className={`terminal-container split-${node.direction === 'horizontal' ? 'h' : 'v'}`}
          style={{ display: 'flex', flexDirection: splitDir, width: '100%', height: '100%', position: 'relative' }}
        >
          <div style={{ flex: `${node.splitPercentage}%`, position: 'relative', minWidth: '100px', minHeight: '100px' }}>
            {renderPane(node.left)}
            {/* Resize handle */}
            <div className={`resize-handle ${handleClass}`} onMouseDown={handleMouseDown} />
          </div>
          <div style={{ flex: `${100 - node.splitPercentage}%`, position: 'relative', minWidth: '100px', minHeight: '100px' }}>
            {renderPane(node.right)}
          </div>
        </div>
      )
    }
  }

  return (
    <>
      <div className={`terminal theme-${terminalTheme}`}>
        {/* Terminal Window Header Bar */}
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="close" onClick={() => window.location.href = '/'}></span>
            <span className="minimize" onClick={() => window.location.href = '/'}></span>
            <span className="maximize"></span>
          </div>
          <div className="terminal-title">purna@coderpurna: ~/resume</div>
          <div className="terminal-controls">
            <div className="theme-selector" title="Select Theme" onClick={() => setThemeModalOpen(true)}>
              <i className="fa-solid fa-palette"></i>
            </div>
          </div>
        </div>

        {/* Dynamic Splits Container */}
        <div className="terminal-container" style={{ height: 'calc(100% - 37px)', overflow: 'hidden' }}>
          {renderPane(layoutRoot)}
        </div>

        {/* Right-click Context Menu */}
        {contextMenu?.active && (
          <div className="context-menu active" style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}>
            <div className="menu-item" onClick={() => splitPane(contextMenu.targetId, 'horizontal')}>
              <i className="fas fa-columns"></i> Split Horizontally
            </div>
            <div className="menu-item" onClick={() => splitPane(contextMenu.targetId, 'vertical')}>
              <i className="fas fa-equals"></i> Split Vertically
            </div>
            {layoutRoot.type === 'split' && (
              <div className="menu-item" style={{ borderTop: '1px solid var(--border-color)' }} onClick={() => closePane(contextMenu.targetId)}>
                <i className="fas fa-times"></i> Close Split
              </div>
            )}
          </div>
        )}

        {/* Terminal Footer Panel links */}
        <div className="terminal-footer">
          <a href="/" className="resume-link">
            <i className="fas fa-shapes"></i> Neo-Brutalism Resume
          </a>
        </div>
      </div>

      {/* Theme Choice Modal */}
      {themeModalOpen && (
        <div className="modal active">
          <div className="modal-content">
            <span className="close-button" onClick={() => setThemeModalOpen(false)}>&times;</span>
            <h2>Select Terminal Theme</h2>
            <div className="theme-options">
              <div className={`theme-option ${terminalTheme === 'default' ? 'active' : ''}`} onClick={() => { setTerminalTheme('default'); setThemeModalOpen(false) }}>
                <div className="theme-preview default-theme"></div>
                <span>Default</span>
              </div>
              <div className={`theme-option ${terminalTheme === 'dracula' ? 'active' : ''}`} onClick={() => { setTerminalTheme('dracula'); setThemeModalOpen(false) }}>
                <div className="theme-preview dracula-theme"></div>
                <span>Dracula</span>
              </div>
              <div className={`theme-option ${terminalTheme === 'solarized' ? 'active' : ''}`} onClick={() => { setTerminalTheme('solarized'); setThemeModalOpen(false) }}>
                <div className="theme-preview solarized-theme"></div>
                <span>Solarized</span>
              </div>
              <div className={`theme-option ${terminalTheme === 'nord' ? 'active' : ''}`} onClick={() => { setTerminalTheme('nord'); setThemeModalOpen(false) }}>
                <div className="theme-preview nord-theme"></div>
                <span>Nord</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Modal */}
      {projectsModalOpen && (
        <div className="modal active">
          <div className="modal-content projects-modal-content">
            <span className="close-button" onClick={() => setProjectsModalOpen(false)}>&times;</span>
            <h2>Project Showcase</h2>
            <div className="projects-container">
              {projects.map((proj, idx) => (
                <div key={idx} className="project-card">
                  <img src={proj.image} alt={proj.title} className="project-image" style={{ objectFit: 'contain', padding: '10px', background: '#222' }} />
                  <div className="project-details">
                    <h3 className="project-title">{proj.title}</h3>
                    <p className="project-description">{proj.description}</p>
                    <div className="project-tech">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="tech-tag">{t}</span>
                      ))}
                    </div>
                    <div className="project-links" style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                      <a href={proj.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-external-link-alt"></i> Demo
                      </a>
                      <a href={proj.repo} className="project-link" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github"></i> Repository
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Skills Progress Visual Modal */}
      {skillsModalOpen && (
        <div className="modal active">
          <div className="modal-content skills-modal-content">
            <span className="close-button" onClick={() => setSkillsModalOpen(false)}>&times;</span>
            <h2>Skills Visualization</h2>
            <div className="skills-container">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="skill-category" style={{ marginBottom: '20px' }}>
                  <h3 className="skill-category-title" style={{ textTransform: 'capitalize', color: 'var(--text-bright)' }}>{category}</h3>
                  <div className="skill-bars" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    {Object.entries(items).map(([name, level]) => (
                      <div key={name} className="skill-item">
                        <div className="skill-info" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span className="skill-name">{name}</span>
                          <span className="skill-level" style={{ opacity: 0.8 }}>{level}%</span>
                        </div>
                        <div className="skill-progress" style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                          <div className="skill-progress-bar" style={{ height: '100%', background: 'var(--text-bright)', borderRadius: '4px', width: `${level}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
