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
    },
  })
  const [activeTerminalId, setActiveTerminalId] = useState('term-main')

  // Context Menu State
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; active: boolean; targetId: string } | null>(null)

  // Modal States
  const [themeModalOpen, setThemeModalOpen] = useState(false)
  const [projectsModalOpen, setProjectsModalOpen] = useState(false)

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
      title: 'CoderArena',
      description: 'A comprehensive coding practice, competitive programming, and technical interview preparation platform featuring interactive coding challenges, structured editorial solutions, and progress analytics.',
      image: '/image/coderarena-cover.png',
      technologies: ['Vite-React', 'Tailwind CSS', 'Node.js', 'TypeScript', 'Express.js', 'Prisma', 'PostgreSQL', 'Docker'],
      demo: 'https://coderarena.tech/',
      repo: 'https://github.com/Purnabrata2005/CodeArena',
    },
    {
      title: 'Interactive Terminal Resume',
      description: 'A unique terminal-based resume with interactive features, pane splitting, custom themes, retro snake game, matrix digital rain, and easter eggs.',
      image: '/image/social-cover.png',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      demo: '/terminal',
      repo: 'https://github.com/Purnabrata2005/coderpurna',
    },
  ]

  // Skills data
  const skills = {
    languages: {
      JavaScript: 95,
      TypeScript: 92,
      Java: 80,
      HTML: 95,
      CSS: 90,
    },
    frontend: {
      'Next.js': 95,
      'React.js': 95,
      'Tailwind CSS': 95,
      'React Native': 85,
      Redux: 88,
    },
    backend: {
      'Node.js': 92,
      'Express.js': 90,
      Firebase: 90,
    },
    databases: {
      MongoDB: 92,
      PostgreSQL: 88,
      Redis: 85,
    },
    cloud_devops: {
      AWS: 80,
      Docker: 85,
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
      case 'game':
        startGame(id)
        break
      case 'exit-game':
        endGame(id)
        break
      case 'pdf':
        printOutput(id, 'Generating PDF resume...', 'info')
        setTimeout(() => {
          printOutput(id, 'Direct PDF downloads are temporarily disabled in the sandboxed preview. Visit the LinkedIn profile to download my complete CV.', 'error')
        }, 800)
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
      wrapColor('• game', '#98fb98') +
      '      ' +
      wrapColor('Play mini-game Snake (Use Arrow keys, Space, ESC)\n', '#ffffff') +
      wrapColor('• pdf', '#98fb98') +
      '       ' +
      wrapColor('Download resume as PDF\n', '#ffffff')

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
      wrapColor(' Hello, World! I am Purnabrata Dey.                       ', '#ffffff') +
      wrapColor('│\n', '#ff8c00') +
      wrapColor('│', '#ff8c00') +
      wrapColor(' Full-Stack Engineer with 4+ years of experience.         ', '#ffffff') +
      wrapColor('│\n', '#ff8c00') +
      wrapColor('│', '#ff8c00') +
      wrapColor(' Passionate about clean code and creative UI designs.     ', '#ffffff') +
      wrapColor('│\n', '#ff8c00') +
      wrapColor('└─────────────────────────────────────────────────────────┘\n\n', '#ff8c00') +
      wrapColor('⚡ Experience\n', '#ff8c00') +
      wrapColor('   Building scalable and efficient software solutions using\n', '#ffffff') +
      wrapColor('   Next.js, React, Node.js, and TypeScript\n\n', '#ff8c00') +
      wrapColor('⚡ Passion\n', '#ff8c00') +
      wrapColor('   Transforming innovative ideas into high-quality applications\n', '#ffffff') +
      wrapColor('   with elegant and efficient implementations\n\n', '#ffffff') +
      wrapColor('⚡ Strengths\n', '#ff8c00') +
      wrapColor('   Strong team player with expertise in designing robust,\n', '#ffffff') +
      wrapColor('   high-performance systems\n\n', '#ffffff') +
      wrapColor('╭───────────────────────────────────────────────────────╮\n', '#ff8c00') +
      wrapColor('│', '#ff8c00') +
      wrapColor(' Ready to bring your innovative ideas to life!         ', '#ffffff') +
      wrapColor('│\n', '#ff8c00') +
      wrapColor('╰───────────────────────────────────────────────────────╯', '#ff8c00')

    printOutput(id, '', 'raw', summary)
  }

  const showSkills = (id: string) => {
    const skillsText =
      wrapColor('🛠️ Technical Expertise\n\n', '#ffff00') +
      '• ' +
      wrapColor('Languages: ', '#00ffff') +
      'JavaScript, TypeScript, Java, HTML, CSS\n' +
      '• ' +
      wrapColor('Frontend: ', '#00ffff') +
      'Next.js, React.js, Tailwind CSS, React Native, Redux, Material-UI, Motion, React Router, Vite, shadcn/ui, Zustand, React Query\n' +
      '• ' +
      wrapColor('Backend: ', '#00ffff') +
      'Node.js, Express.js, Drizzle ORM, Prisma, Firebase, AWS S3\n' +
      '• ' +
      wrapColor('Cloud & DevOps: ', '#00ffff') +
      'AWS, Docker, Cloudinary\n' +
      '• ' +
      wrapColor('Databases: ', '#00ffff') +
      'MongoDB, Redis, PostgreSQL\n' +
      '• ' +
      wrapColor('Tools & More: ', '#00ffff') +
      'Git, VSCode, Postman, Requestly, pnpm, Bun'

    printOutput(id, '', 'raw', skillsText)
  }

  const showExperience = (id: string) => {
    const expText =
      wrapColor('💼 Professional Experience\n\n', '#ffff00') +
      wrapColor('CODERARENA | Full-Stack Engineer & Creator\n', '#00ffff') +
      wrapColor('2026 - Present | Digha, West Bengal, India\n', '#ffffff') +
      '• Built and launched CoderArena, a complete coding practice platform featuring interactive coding challenges,\n' +
      '  interview preparation paths, structured editorial solutions, and progress analytics.\n' +
      '• Engineered high-performance compilers/interpreters and scalable web infrastructure.\n' +
      wrapColor('Stack: Next.js, Tailwind CSS, React, Node.js, TypeScript, JavaScript, Docker\n\n', '#87cefa') +
      wrapColor('SRABU CONSULTANCY SERVICES | Associate Software Engineer Intern\n', '#00ffff') +
      wrapColor('Oct 2025 - Dec 2025 | Kolkata, West Bengal, India (Hybrid)\n', '#ffffff') +
      '• Selected for the Software Development & Engineering Team, contributing to digital future and solutions.\n' +
      '• Worked on IT consulting and digital marketing software under manager Saikat Chattaraj.\n' +
      '• <a href="https://drive.google.com/file/d/13xNcTGZ1cUgJK-XcH_DYiojGuXETK-EL/view?usp=sharing" target="_blank" style="color:#ffffff;text-decoration:underline;">View Confirmation Letter</a>'

    printOutput(id, '', 'raw', expText)
  }

  const showEducation = (id: string) => {
    const eduText =
      wrapColor('🎓 Education\n\n', '#ff8c00') +
      wrapColor('Bachelor\'s Degree in Computer Science & Engineering\n', '#ffffff') +
      'Ramkrishna Mahato Government Engineering College • Purulia, West Bengal, India (2023 - 2027 Pursuing)\n\n' +
      wrapColor('Higher Secondary (Class XII)\n', '#ffffff') +
      'Bodhra Pantheswari High School • West Bengal, India (2021 - 2023)\n\n' +
      wrapColor('Secondary Education (Class X)\n', '#ffffff') +
      'Bodhra Pantheswari High School • West Bengal, India (2019 - 2021)'

    printOutput(id, '', 'raw', eduText)
  }

  const showContact = (id: string) => {
    const contactText =
      wrapColor('📫 Contact Information\n\n', '#ff8c00') +
      '• ' +
      wrapColor('Email: ', '#ff8c00') +
      '<a href="mailto:coderpurna@gmail.com" style="color:#ffffff;text-decoration:underline;">coderpurna@gmail.com</a>\n' +
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
      'game',
      'exit-game',
      'pdf',
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
      [id]: { ...prev[id], isGameActive: true },
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
    </>
  )
}
