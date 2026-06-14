'use client'

import React, { useEffect, useRef } from 'react'

export default function JourneyMap() {
  const mapRef = useRef<any>(null)
  const mapContainerId = 'journey-map'

  useEffect(() => {
    const L = (window as any).L
    if (!L) {
      console.warn('Leaflet global "L" is not loaded yet.')
      return
    }

    if (mapRef.current) {
      return
    }

    const initialView = { center: [21.6266, 87.5074] as [number, number], zoom: 6 }

    const map = L.map(mapContainerId, {
      center: initialView.center,
      zoom: initialView.zoom,
      scrollWheelZoom: false,
      zoomControl: true,
    })
    mapRef.current = map

    L.tileLayer('https://watercolormaps.collection.cooperhewitt.org/tile/watercolor/{z}/{x}/{y}.jpg', {
      attribution: '© Stamen Design, © OpenStreetMap contributors',
      maxZoom: 16,
    }).addTo(map)

    // Add custom home button control
    const HomeControl = L.Control.extend({
      onAdd: function (map: any) {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-home')
        const link = L.DomUtil.create('a', '', container)
        link.href = '#'
        link.title = 'Reset map view'
        link.innerHTML = '<i class="fas fa-home"></i>'

        L.DomEvent.on(link, 'click', function (e: any) {
          e.preventDefault()
          map.setView(initialView.center, initialView.zoom)
        })

        return container
      },
    })

    new HomeControl({ position: 'topright' }).addTo(map)

    // Group locations by country
    const locations = [
      {
        coords: [21.6266, 87.5074] as [number, number],
        country: 'India',
        companies: [
          {
            city: 'Digha, West Bengal',
            company: 'CoderArena',
            period: '2026 - Present',
            role: 'Full-Stack Engineer',
          },
        ],
      },
    ]

    const markers: Record<string, any> = {}

    locations.forEach((location) => {
      const isCurrent = location.country === 'India'
      const markerIcon = L.divIcon({
        className: isCurrent ? 'neo-marker neo-marker-current' : 'neo-marker',
        html: `
          <div class="neo-marker-label ${isCurrent ? 'neo-marker-label-current' : ''}">${location.country}</div>
          <div class="neo-marker-pin ${isCurrent ? 'neo-marker-pin-current' : ''}"></div>
        `,
        iconSize: isCurrent ? [35, 35] : [30, 30],
        iconAnchor: isCurrent ? [17.5, 50] : [15, 45],
        popupAnchor: [0, isCurrent ? -50 : -45],
      })

      let popupContent = `<div class="map-popup">`
      popupContent += `<div class="map-popup-country">${location.country}</div>`

      location.companies.forEach((company, index) => {
        if (index > 0) popupContent += `<div class="map-popup-divider"></div>`
        popupContent += `
          <div class="map-popup-company">
            <strong>${company.company}</strong>
            <span>${company.role}</span>
            <small>${company.city}</small>
            <small>${company.period}</small>
          </div>
        `
      })

      popupContent += `</div>`

      const marker = L.marker(location.coords, { icon: markerIcon }).addTo(map)
      marker.bindPopup(popupContent)
      markers[location.country] = marker
    })

    // Expose focus function to the window object so timeline elements can trigger it
    ;(window as any).journeyMapHelper = {
      focusCountry: (country: string) => {
        const marker = markers[country]
        if (marker) {
          map.setView(marker.getLatLng(), 6, {
            animate: true,
            duration: 1,
          })
          setTimeout(() => {
            marker.openPopup()
          }, 500)
        }
      },
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      delete (window as any).journeyMapHelper
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div id={mapContainerId} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
