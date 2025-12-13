'use client';

/**
 * MeshGradient Component
 * Animated mesh gradient overlay for visual depth
 * Spec: ultimate_design_spec.md - Layer 4
 */

export default function MeshGradient() {
    return (
        <div
            className="mesh-gradient-overlay"
            style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                pointerEvents: 'none',
                background: `linear-gradient(
          135deg,
          rgba(88, 28, 135, 0.15) 0%,
          rgba(157, 23, 77, 0.15) 50%,
          rgba(30, 58, 138, 0.15) 100%
        )`,
                backgroundSize: '400% 400%',
                mixBlendMode: 'multiply',
                animation: 'gradient-shift 40s ease-in-out infinite',
            }}
        />
    );
}
