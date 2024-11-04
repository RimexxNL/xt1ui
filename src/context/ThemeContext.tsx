import React, {createContext, ReactNode, useContext, useEffect, useState} from "react"
import {AccentColors, LightDarkTheme, SystemTheme} from "../resources/typescript/types";

const ThemeContext = createContext({
    theme: 'light',
    accent: 'blue',
    toggleTheme: () => {},
    setAccent: (_accent:AccentColors) => {},
    setTheme: (_theme:SystemTheme) => {}
})

export const useTheme = () => useContext(ThemeContext)

interface ThemeProviderProps {
    children: ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const [theme, setThemeScheme] = useState<LightDarkTheme>('light')
    const [accent, setAccentColor] = useState<AccentColors>('blue')

    const htmlTag:HTMLElement = document.documentElement

    useEffect(() => {

        // register event listener to detect operating system dark/light changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', async(e) => {
            const newColorScheme = e.matches ? "dark" : "light"
            const storedTheme = localStorage.getItem("xt1theme")
            if (storedTheme === null) {
                setThemeScheme(newColorScheme === 'dark' ? 'dark' : 'light')
                htmlTag.setAttribute("data-theme", newColorScheme)
            }
        })

        // Asynchronously retrieve the stored theme preference
        const determineTheme = async () => {
            try {
                const storedTheme = localStorage.getItem("xt1theme")
                let foundScheme = "light"
                if (storedTheme === null) {
                    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                        foundScheme = "dark"
                    }
                } else {
                    setThemeScheme(storedTheme === 'light' ? 'light' : 'dark')
                    htmlTag.setAttribute("data-theme", storedTheme === 'light' ? 'light' : 'dark')
                    return
                }

                setThemeScheme(foundScheme === 'dark' ? 'dark' : 'light')

                document.documentElement.setAttribute("data-theme", foundScheme)

            } catch (error) {
                console.error('Failed to initialize theme:', error)
            }
        }

        const determineAccent = async () => {
            try {
                const storedAccent = localStorage.getItem("xt1accent")
                if (storedAccent !== null) {
                    setAccentColor(storedAccent as AccentColors)
                    htmlTag.setAttribute("data-accent", storedAccent)
                }
            } catch (error) {
                console.error('Failed to initialize accent', error)
            }
        }

        determineAccent().then(() => {})
        determineTheme().then(() => {})

        return () => {}
    },[])

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        try {
            localStorage.setItem("xt1theme", newTheme)
            htmlTag.setAttribute("data-theme", newTheme === 'light' ? 'light' : 'dark')
            setThemeScheme(newTheme)
        } catch (error) {
            console.error('Failed to store theme in localStorage:', error)
        }
    }

    const setTheme = async (theme:SystemTheme) => {
        try {
            if (theme !== 'system') {
                localStorage.setItem("xt1theme", theme)
                htmlTag.setAttribute("data-theme", theme)
                setThemeScheme(theme)
            } else {
                localStorage.removeItem("xt1theme")
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    setThemeScheme("dark")
                    htmlTag.setAttribute("data-theme", "dark")
                } else {
                    setThemeScheme("light")
                    htmlTag.setAttribute("data-theme", "light")
                }
            }
        } catch (error) {
            console.error('Failed to store theme in localStorage:', error)
        }
    }

    const setAccent = async (accent:AccentColors) => {
        try {
            if (accent !== '') {
                localStorage.setItem("xt1accent", accent)
                htmlTag.setAttribute("data-accent", accent)
                setAccentColor(accent)
            } else {
                localStorage.removeItem("xt1accent")
                setAccentColor("blue")
            }
        } catch (error) {
            console.error('Failed to store accent in localStorage:', error)
        }
    }
    return (
        <ThemeContext.Provider value={{ theme, accent, toggleTheme, setTheme, setAccent }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider