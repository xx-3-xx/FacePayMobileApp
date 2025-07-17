import React from 'react'

// Add CSS keyframes for animations
const animationKeyframes = `
  @keyframes shine {
    0% { 
      transform: translateX(-100%) rotate(45deg);
      opacity: 0;
    }
    50% { 
      opacity: 1;
    }
    100% { 
      transform: translateX(100%) rotate(45deg);
      opacity: 0;
    }
  }
  
  @keyframes subtle-float {
    0%, 100% { 
      transform: translateY(0px);
    }
    50% { 
      transform: translateY(-2px);
    }
  }
`

// Inject the CSS into the document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = animationKeyframes
  document.head.appendChild(style)
}

interface Card3DProps {
  brand: string
  number: string
  holder: string
  expiry: string
  onClick?: (e?: React.MouseEvent) => void
  stacked?: boolean
  style?: React.CSSProperties
}


export default function Card3D({
  brand,
  number,
  holder,
  expiry,
  onClick,
  stacked = false,
  style = {}
}: Card3DProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isPressed, setIsPressed] = React.useState(false)

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e)
    }
  }

  // Enhanced 3D transform for both stacked and expanded states
  const get3DTransform = () => {
    if (stacked) {
      return 'perspective(1000px) rotateX(2deg) rotateY(-2deg)'
    }
    
    if (isPressed) {
      return 'perspective(1000px) rotateX(1deg) rotateY(0deg) translateZ(-4px)'
    }

    
    return 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
  }

  const defaultStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '380px',
    height: '220px',
    background: style.background || 'linear-gradient(135deg, #000000 0%, #333333 100%)',
    color: style.color || '#ffffff',
    borderRadius: '20px',
    padding: '28px',
    cursor: onClick ? 'pointer' : 'default',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: isPressed 
      ? '0 4px 12px rgba(0,0,0,0.15)' 
      : '0 8px 40px rgba(0,0,0,0.2)', 
    border: style.border || 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    transform: get3DTransform(),
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
    willChange: 'transform',
    overflow: 'hidden',
    ...style,
    // Preserve the background from parent
    background: style.background || 'linear-gradient(135deg, #000000 0%, #333333 100%)'
  }

  const chipStyle: React.CSSProperties = {
    position: 'absolute',
    top: '24px',
    left: '28px',
    width: '40px',
    height: '32px',
    background: style.color === '#000' 
      ? 'linear-gradient(135deg, #000000 0%, #333333 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
    borderRadius: '6px',
    border: `1px solid ${style.color === '#000' ? '#333333' : '#e0e0e0'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    color: style.color === '#000' ? '#ffffff' : '#000000',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    transform: 'translateZ(4px)'
  }

  const getBrandIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return '💳'
      case 'mastercard':
        return '💳'
      case 'amex':
        return '💳'
      case 'bank':
        return '🏦'
      default:
        return '💳'
    }
  }

  return (
    <div
      style={defaultStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      
    >
      {/* Shine effect overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: style.color === '#000' 
          ? 'linear-gradient(45deg, transparent 30%, rgba(0,0,0,0.3) 50%, transparent 70%)'
          : 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
        borderRadius: '20px',
        pointerEvents: 'none',
        opacity:0,
        transition: 'opacity 0.3s ease',
        transform: 'translateZ(2px)',
        width: '20px',
        height: '100%',
      }} />

      {/* Chip */}
      <div style={chipStyle}>
        {getBrandIcon(brand)}
      </div>

      {/* Card Brand */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: '40px'
      }}>
        <div style={{
          fontSize: '16px',
          fontWeight: '700',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          transform: 'translateZ(2px)'
        }}>
          {brand}
        </div>
        {stacked && (
          <div style={{
            fontSize: '14px',
            opacity: 0.7,
            transform: 'translateZ(2px)'
          }}>
            ●●●
          </div>
        )}
      </div>

      {/* Card Number */}
      <div style={{
        fontSize: '20px',
        fontWeight: '500',
        letterSpacing: '3px',
        fontFamily: 'monospace',
        marginTop: '24px',
        transform: 'translateZ(2px)',
        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
      }}>
        {number}
      </div>

      {/* Card Holder and Expiry */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: '32px',
        transform: 'translateZ(2px)'
      }}>
        <div>
          <div style={{
            fontSize: '10px',
            opacity: 0.8,
            marginBottom: '6px',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            CARD HOLDER
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            {holder}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontSize: '10px',
            opacity: 0.8,
            marginBottom: '6px',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            {expiry.includes('/') ? 'EXPIRES' : 'TYPE'}
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            {expiry}
          </div>
        </div>
      </div>

      {/* Background pattern overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: style.color === '#000' 
          ? 'radial-gradient(circle at 80% 20%, rgba(0,0,0,0.2) 0%, transparent 50%)'
          : 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)',
        borderRadius: '20px',
        pointerEvents: 'none',
        transform: 'translateZ(1px)'
      }} />
    </div>
  )
}