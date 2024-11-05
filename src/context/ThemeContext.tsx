import React, {createContext, ReactNode, useContext, useEffect, useState} from "react"
import {AccentColors, LightDarkTheme, SystemTheme} from "../resources/typescript/types";

const ThemeContext = createContext({
    theme: 'system',
    accent: 'blue',
    toggleTheme: () => {},
    setAccent: (_accent:AccentColors) => {},
    setTheme: (_theme:SystemTheme) => {}
})

export const useTheme = () => useContext(ThemeContext)

interface ThemeProviderProps {
    children: ReactNode
    defaultTheme?: SystemTheme
    defaultAccent?: AccentColors
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({children, defaultTheme="system", defaultAccent}) => {
    const [theme, setThemeScheme] = useState<SystemTheme>(defaultTheme)
    const [accent, setAccentColor] = useState<AccentColors>(defaultAccent)

    const htmlTag:HTMLElement = document.documentElement

    useEffect(() => {

        // Asynchronously retrieve the stored theme preference
        const determineTheme = async () => {
            try {
                const storedTheme = localStorage.getItem("xt1theme")
                // internally we set our start decision to light
                let decidedTheme = "light"

                // when we do not have a storedTheme
                if (storedTheme === null) {
                    // and the defaultTheme is set to system
                    if (defaultTheme==="system") {
                        // we check the OS if it's set to dark
                        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                            decidedTheme = "dark"
                        }
                    } else if (defaultTheme === "light" || defaultTheme === "dark") {
                        decidedTheme = defaultTheme
                    }
                } else {
                    // if storedTheme is actually set, we set theme accordingly
                    if (storedTheme === "system") {
                        // we check the OS if it's set to dark
                        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                            decidedTheme = "dark"
                        }
                    } else if (storedTheme === "light" || storedTheme === "dark") {
                        decidedTheme = storedTheme
                    }
                }

                setThemeScheme(decidedTheme as SystemTheme)
                htmlTag.setAttribute("data-theme", decidedTheme)

            } catch (error) {
                console.error('Failed to initialize theme:', error)
            }
        }


        // register event listener to detect operating system dark/light changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', async (e) => {
            const newColorScheme = e.matches ? "dark" : "light"
            const storedTheme = localStorage.getItem("xt1theme")
            if (storedTheme === null || storedTheme === "system") {
                setThemeScheme(newColorScheme === 'dark' ? 'dark' : 'light')
                htmlTag.setAttribute("data-theme", newColorScheme)
            }
        })


        const determineAccent = async () => {
            let decidedAccent = 'blue'

            try {
                const storedAccent = localStorage.getItem("xt1accent")
                if (storedAccent !== null) {
                    decidedAccent = storedAccent

                } else if (defaultAccent !== undefined) {
                    decidedAccent = defaultAccent
                }

                setAccentColor(decidedAccent as AccentColors)
                htmlTag.setAttribute("data-accent", decidedAccent)
            } catch (error) {
                console.error('Failed to initialize accent', error)
            }
        }

        determineTheme().then(() => {})
        determineAccent().then(() => {})

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