'use client'

import React, { useEffect, useState } from 'react'

import LoaderOverlay from '../components/LoaderOverlay'
import ProgressBar from '../components/ProgressBar'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import PaperTearParallax from '../components/PaperTearParallax'
import About from '../components/About'
import WhatIDo from '../components/WhatIDo'
import Journey from '../components/Journey'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import GithubCalendarSection from '../components/GithubCalendar'
import EducationLanguages from '../components/EducationLanguages'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  const [isLoaderHidden, setIsLoaderHidden] = useState(false)
  const [activeTheme, setActiveTheme] = useState('light')
  const [greeting, setGreeting] = useState('Hi there! 👋')

  const [activeSection, setActiveSection] = useState('hero')
  const [isNavbarHidden, setIsNavbarHidden] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [photoTilted, setPhotoTilted] = useState(false)
  const [terminalFallen, setTerminalFallen] = useState(false)

  // Paper Tear and Sticker states
  const [gapHeight, setGapHeight] = useState(300)
  const [tearMarginTop, setTearMarginTop] = useState(0)
  const [tearOpacity, setTearOpacity] = useState(1)
  const [stickerTransform, setStickerTransform] = useState('rotate(-8deg) translateY(-40px) translateZ(30px) rotateX(35deg)')
  const [stickerOpacity, setStickerOpacity] = useState(0)

  // 3D Timeline Rotation states
  const [timelineRotateY, setTimelineRotateY] = useState(180)
  const [timelineZIndex, setTimelineZIndex] = useState(1)
  const [timelineBackZIndex, setTimelineBackZIndex] = useState(100)
  const [timelineOverflow, setTimelineOverflow] = useState<'hidden' | 'auto'>('hidden')

  // Matrix Greeting typing effect
  useEffect(() => {
    const finalText = 'Hi there! 👋'
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let iterations = 0

    const interval = setInterval(() => {
      setGreeting(
        finalText
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return finalText[index]
            }
            if (char === ' ' || char === '👋') {
              return char
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      if (iterations >= finalText.length) {
        clearInterval(interval)
      }
      iterations += 1 / 3
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // Combined Scroll and Intersection Observer Setup
  useEffect(() => {
    // Scroll restoration setting
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    // Hide loader overlay after 1.2 seconds
    const loaderTimeout = setTimeout(() => {
      setIsLoaderHidden(true)
    }, 1200)

    let lastScrollY = 0

    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight - windowHeight

      // 1. Progress Bar Fill
      const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0
      setScrollProgress(pct)

      // 2. Smart Hide/Show Navbar
      if (scrollY > lastScrollY && scrollY > 100) {
        setIsNavbarHidden(true)
      } else {
        setIsNavbarHidden(false)
      }

      // 3. Active Checkpoint link highlighting
      const sections = ['hero', 'about', 'experience', 'skills', 'contact']
      sections.forEach((secId) => {
        const el = document.getElementById(secId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setActiveSection(secId)
          }
        }
      })

      // 4. Photo Tilt on Scroll
      if (scrollY > 5) {
        setPhotoTilted(true)
      }

      // 5. Falling Terminal decoration element
      if (scrollY > 5 && !terminalFallen) {
        setTerminalFallen(true)
        const decoTerminal = document.querySelector('.deco-terminal') as HTMLElement
        const heroContent = document.querySelector('.hero-content') as HTMLElement
        if (decoTerminal && heroContent) {
          const heroContentRect = heroContent.getBoundingClientRect()
          const heroContentBottom = heroContentRect.bottom + window.scrollY
          const terminalRect = decoTerminal.getBoundingClientRect()
          const terminalBottom = terminalRect.bottom + window.scrollY
          const fall = Math.max(0, heroContentBottom - terminalBottom - 50)
          decoTerminal.style.setProperty('--fall-distance', `${fall}px`)
        }
      }

      // 6. Paper Tear Gap Parallax
      const isMobile = window.innerWidth <= 768
      if (!isMobile) {
        const minGapHeight = -30
        const initialGapHeight = 300
        const scrollStart = 100
        const scrollRange = 200
        const stickerDelay = 30
        const stickerStart = scrollStart + scrollRange + stickerDelay
        const stickerRange = 60

        const paperTearBottomEl = document.querySelector('.paper-tear-bottom') as HTMLElement
        const tearTapeStickerEl = document.querySelector('.tear-tape-sticker') as HTMLElement

        if (paperTearBottomEl && tearTapeStickerEl) {
          const rect = paperTearBottomEl.getBoundingClientRect()
          tearTapeStickerEl.style.setProperty('--tape-position', `${rect.top}px`)
        }

        if (scrollY <= scrollStart) {
          setGapHeight(initialGapHeight)
          setTearMarginTop(0)
          setTearOpacity(1)
          setStickerTransform('rotate(-8deg) translateY(-40px) translateZ(30px) rotateX(35deg)')
          setStickerOpacity(0)
        } else if (scrollY >= scrollStart && scrollY <= scrollStart + scrollRange) {
          const progress = (scrollY - scrollStart) / scrollRange
          const currentHeight = initialGapHeight - (initialGapHeight - minGapHeight) * progress

          if (currentHeight >= 0) {
            setGapHeight(currentHeight)
            setTearMarginTop(0)
            setTearOpacity(1)
            setStickerTransform('rotate(-8deg) translateY(-100px) translateZ(50px) rotateX(45deg)')
            setStickerOpacity(0)
          } else {
            setGapHeight(0)
            setTearMarginTop(currentHeight)
            const negativePart = Math.abs(minGapHeight)
            const negativeProgress = Math.abs(currentHeight) / negativePart
            const opacity = 1 - negativeProgress
            setTearOpacity(opacity)
            setStickerTransform('rotate(-8deg) translateY(-100px) translateZ(50px) rotateX(45deg)')
            setStickerOpacity(0)
          }
        } else if (scrollY > stickerStart && scrollY < stickerStart + stickerRange) {
          setGapHeight(0)
          setTearMarginTop(minGapHeight)
          setTearOpacity(0)
          const stickerProgress = (scrollY - stickerStart) / stickerRange
          const translateY = -40 + 40 * stickerProgress
          const translateZ = 30 - 30 * stickerProgress
          const rotateX = 35 - 35 * stickerProgress
          const opacityVal = Math.min(1, Math.max(0, (stickerProgress - 0.35) * 1.54))

          setStickerTransform(`rotate(-8deg) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg)`)
          setStickerOpacity(opacityVal)
        } else if (scrollY >= stickerStart + stickerRange) {
          setGapHeight(0)
          setTearMarginTop(minGapHeight)
          setTearOpacity(0)
          setStickerTransform('rotate(-8deg) translateY(0px) translateZ(0px) rotateX(0deg)')
          setStickerOpacity(1)
        } else {
          setGapHeight(0)
          setTearMarginTop(minGapHeight)
          setTearOpacity(0)
          setStickerTransform('rotate(-8deg) translateY(-40px) translateZ(30px) rotateX(35deg)')
          setStickerOpacity(0)
        }
      }

      // 7. Highlight Parallax Progress
      const highlights = document.querySelectorAll('.highlight') as NodeListOf<HTMLElement>
      highlights.forEach((h, idx) => {
        const rect = h.getBoundingClientRect()
        const elementTop = rect.top + scrollY
        const triggerPoint = scrollY + windowHeight * 0.8

        const hasStarted = h.getAttribute('data-started') === 'true'
        let startScroll = parseFloat(h.getAttribute('data-start-scroll') || '0')

        if (!hasStarted && triggerPoint >= elementTop) {
          h.setAttribute('data-started', 'true')
          h.setAttribute('data-start-scroll', scrollY.toString())
          h.setAttribute('data-direction', idx % 2 === 0 ? 'left' : 'right')
          startScroll = scrollY
        }

        if (h.getAttribute('data-started') === 'true') {
          const progress = Math.min(1, Math.max(0, (scrollY - startScroll) / 100))
          h.style.setProperty('--highlight-progress', `${progress * 100}%`)
        }

        if (h.getAttribute('data-started') === 'true' && scrollY < startScroll - 50) {
          h.setAttribute('data-started', 'false')
          h.style.setProperty('--highlight-progress', '0%')
        }
      })

      // 8. Language Stars Parallax Progress
      const languageItems = document.querySelectorAll('.language-item') as NodeListOf<HTMLElement>
      languageItems.forEach((item) => {
        const rect = item.getBoundingClientRect()
        const elementTop = rect.top + scrollY
        const triggerPoint = scrollY + windowHeight * 0.8

        const hasStarted = item.getAttribute('data-started') === 'true'
        let startScroll = parseFloat(item.getAttribute('data-start-scroll') || '0')

        if (!hasStarted && triggerPoint >= elementTop) {
          item.setAttribute('data-started', 'true')
          item.setAttribute('data-start-scroll', scrollY.toString())
          startScroll = scrollY
        }

        if (item.getAttribute('data-started') === 'true') {
          const scrollProgressValue = scrollY - startScroll
          const stars = item.querySelectorAll('.language-stars .star')
          stars.forEach((star, idx) => {
            const starTrigger = idx * 50
            if (scrollProgressValue >= starTrigger) {
              star.classList.add('visible')
            }
          })
        }
      })

      // 9. Journey Timeline Book Page Rotation (Desktop Only)
      const journeyTimeline = document.querySelector('.journey-timeline') as HTMLElement
      const journeyTimelineBack = document.querySelector('.journey-timeline-back') as HTMLElement
      if (journeyTimeline && journeyTimelineBack && window.innerWidth >= 769) {
        const rect = journeyTimeline.getBoundingClientRect()
        const elementTop = rect.top + scrollY
        const triggerPoint = scrollY + windowHeight * 0.5

        const hasStarted = journeyTimeline.getAttribute('data-started') === 'true'
        let startScroll = parseFloat(journeyTimeline.getAttribute('data-start-scroll') || '0')

        if (!hasStarted && triggerPoint >= elementTop) {
          journeyTimeline.setAttribute('data-started', 'true')
          journeyTimeline.setAttribute('data-start-scroll', scrollY.toString())
          startScroll = scrollY
        }

        if (journeyTimeline.getAttribute('data-started') === 'true') {
          const pageRange = 200
          const progress = Math.min(1, Math.max(0, (scrollY - startScroll) / pageRange))
          const rotY = 180 - 180 * progress

          setTimelineRotateY(rotY)

          if (rotY > 95) {
            setTimelineZIndex(1)
            setTimelineBackZIndex(100)
          } else {
            setTimelineZIndex(100)
            setTimelineBackZIndex(1)
          }

          if (progress >= 1) {
            setTimelineOverflow('auto')
          } else {
            setTimelineOverflow('hidden')
          }
        } else {
          setTimelineRotateY(180)
          setTimelineZIndex(1)
          setTimelineBackZIndex(100)
          setTimelineOverflow('hidden')
        }
      }

      lastScrollY = scrollY
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    handleScroll()

    // Intersection observer for section fade ins
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in')
        }
      })
    }, observerOptions)

    document.querySelectorAll('.section, .timeline-item-flat, .skill-box').forEach((el) => {
      observer.observe(el)
    })

    // Theme setup
    const currentTheme = localStorage.getItem('theme') || 'light'
    setActiveTheme(currentTheme)
    document.body.setAttribute('data-theme', currentTheme)

    return () => {
      clearTimeout(loaderTimeout)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      observer.disconnect()
    }
  }, [terminalFallen])

  const handleThemeToggle = () => {
    const nextTheme = activeTheme === 'light' ? 'dark' : 'light'
    setActiveTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    document.body.setAttribute('data-theme', nextTheme)
  }

  const scrollToSection = (secId: string) => {
    const el = document.getElementById(secId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleTimelineItemClick = (country: string) => {
    if ((window as any).journeyMapHelper) {
      ;(window as any).journeyMapHelper.focusCountry(country)
    }
  }

  return (
    <>
      {/* Loading Screen */}
      <LoaderOverlay isLoaderHidden={isLoaderHidden} />

      <div className="page-wrapper">
        {/* Progress Bar Checkpoints */}
        <ProgressBar
          scrollProgress={scrollProgress}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
        />

        {/* Navbar */}
        <Navbar
          activeSection={activeSection}
          isNavbarHidden={isNavbarHidden}
          activeTheme={activeTheme}
          handleThemeToggle={handleThemeToggle}
          scrollToSection={scrollToSection}
        />

        {/* Hero Section */}
        <Hero
          greeting={greeting}
          photoTilted={photoTilted}
          terminalFallen={terminalFallen}
          scrollToSection={scrollToSection}
        />

        {/* Paper Tear / Gap Parallax */}
        <PaperTearParallax
          gapHeight={gapHeight}
          tearMarginTop={tearMarginTop}
          tearOpacity={tearOpacity}
          stickerTransform={stickerTransform}
          stickerOpacity={stickerOpacity}
        />

        {/* Core Container */}
        <div className="container">
          {/* What I Do Section */}
          <WhatIDo />

          {/* About Section */}
          <About />

          {/* Journey Section */}
          <Journey
            timelineRotateY={timelineRotateY}
            timelineZIndex={timelineZIndex}
            timelineBackZIndex={timelineBackZIndex}
            timelineOverflow={timelineOverflow}
            handleTimelineItemClick={handleTimelineItemClick}
          />

          {/* Skills Section */}
          <Skills />

          {/* Projects Section */}
          <Projects />

          {/* GitHub Activity Section */}
          <GithubCalendarSection activeTheme={activeTheme} />

          {/* Education & Languages Section */}
          <EducationLanguages />

          {/* Contact Section */}
          <Contact />

          {/* Footer */}
          <Footer scrollToSection={scrollToSection} />
        </div>
      </div>
    </>
  )
}