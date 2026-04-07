import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
    it('renders with children', () => {
        render(<Button>Click me</Button>)
        expect(screen.getByRole('button')).toHaveTextContent('Click me')
    })

    it('handles click events', () => {
        const handleClick = vi.fn()
        render(<Button onClick={handleClick}>Click me</Button>)
        fireEvent.click(screen.getByRole('button'))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('applies fullWidth prop correctly', () => {
        const { container } = render(<Button fullWidth>Full Width</Button>)
        expect(container.firstChild).toHaveClass('w-full')
    })

    it('shows loading state', () => {
        render(<Button isLoading>Loading</Button>)
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('applies variant classes', () => {
        const { rerender } = render(<Button variant="primary">Primary</Button>)
        expect(screen.getByRole('button')).toHaveClass('bg-primary-600')

        rerender(<Button variant="secondary">Secondary</Button>)
        expect(screen.getByRole('button')).toHaveClass('bg-white')

        rerender(<Button variant="ghost">Ghost</Button>)
        expect(screen.getByRole('button')).toHaveClass('bg-transparent')
    })

    it('applies size classes', () => {
        const { rerender } = render(<Button size="sm">Small</Button>)
        expect(screen.getByRole('button')).toHaveClass('min-h-[48px]')

        rerender(<Button size="md">Medium</Button>)
        expect(screen.getByRole('button')).toHaveClass('min-h-[48px]')

        rerender(<Button size="lg">Large</Button>)
        expect(screen.getByRole('button')).toHaveClass('min-h-[48px]')
    })
})