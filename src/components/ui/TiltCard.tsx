import { useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    perspective?: number;
    scale?: number;
    rotationIntensity?: number;
}

export function TiltCard({
    children,
    className,
    perspective = 1000,
    scale = 1.05,
    rotationIntensity = 15 // Degrees of rotation
}: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate rotation based on mouse position
        // Center of the card is (0,0) for calculation
        // Top-Left Hover -> Rotate X positive (tilt up), Rotate Y negative (tilt left) - Wait, actually:
        // Hover Top: Rotate X positive (pushes bottom away? no, picking top up means top comes close)
        // Let's standardise:
        // Cursor Top-Left: Card should tilt towards Top-Left. 
        // RotateX should be positive (top comes out) or negative?
        // CSS rotateX: positive moves top back. negative moves top forward.
        // So Cursor Top -> Y < height/2 -> We want Top to come forward (negative RotateX)
        // Cursor Bottom -> Y > height/2 -> We want Bottom to come forward (positive RotateX)

        // Cursor Left -> X < width/2 -> We want Left to come forward (positive RotateY)
        // Cursor Right -> X > width/2 -> We want Right to come forward (negative RotateY)

        const yPct = (mouseY / height) - 0.5; // -0.5 to 0.5
        const xPct = (mouseX / width) - 0.5; // -0.5 to 0.5

        const rotateX = yPct * -rotationIntensity * 2; // -0.5 * -30 = 15deg (Top hover -> 15deg -> Top comes forward? wait. rotateX(15deg) moves top back.)
        // We want "picking up" - the part we hold comes UP (closer to Z).
        // Standard CSS rotateX(10deg) pushes the top away. rotateX(-10deg) pulls top closer.
        // If I hover top (yPct < 0), I want top closer (rotateX negative).
        // yPct is -0.5. -0.5 * SOME_FACTOR = negative. So Factor must be positive.
        // Let's try: rotateX = -yPct * rotationIntensity * 2. 
        // If yPct is -0.5 (top), result is 0.5 * 30 = 15 (positive). Positive rotateX pushes top away.
        // I want top CLOSE. So rotateX should be NEGATIVE.
        // So rotateX = yPct * rotationIntensity * 2.
        // -0.5 * 30 = -15. Perfect.

        const rotateY = xPct * -rotationIntensity * 2; // same logic for Y
        // Right hover (xPct 0.5) -> want right close -> rotateY negative?
        // rotateY(10deg) -> right side goes back.
        // rotateY(-10deg) -> right side comes front.
        // So xPct (0.5) * -1 = negative. Correct.

        setTransform(`perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn("transition-transform duration-100 ease-out will-change-transform transform-style-3d", className)}
            style={{
                transform: isHovered ? transform : undefined,
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out' // Fast on hover, smooth return
            }}
        >
            {children}
        </div>
    );
}
