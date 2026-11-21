import { type LucideIcon, Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "#/components/ui/radio-group";

type ThemeMode = "light" | "dark" | "auto";

const MODES: Record<
	ThemeMode,
	{
		label: string;
		icon: LucideIcon;
	}
> = {
	auto: { label: "Système", icon: Monitor },
	light: { label: "Clair", icon: Sun },
	dark: { label: "Sombre", icon: Moon },
};

function getInitialMode(): ThemeMode {
	if (typeof window === "undefined") {
		return "auto";
	}

	const stored = window.localStorage.getItem("theme");
	if (stored === "light" || stored === "dark" || stored === "auto") {
		return stored;
	}

	return "auto";
}

function applyThemeMode(mode: ThemeMode) {
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const resolved = mode === "auto" ? (prefersDark ? "dark" : "light") : mode;

	document.documentElement.classList.remove("light", "dark");
	document.documentElement.classList.add(resolved);

	if (mode === "auto") {
		document.documentElement.removeAttribute("data-theme");
	} else {
		document.documentElement.setAttribute("data-theme", mode);
	}

	document.documentElement.style.colorScheme = resolved;
}

export default function ThemeToggle({
	compact = false,
}: {
	compact?: boolean;
}) {
	const [mode, setMode] = useState<ThemeMode>("auto");

	useEffect(() => {
		const initialMode = getInitialMode();
		setMode(initialMode);
		applyThemeMode(initialMode);
	}, []);

	useEffect(() => {
		if (mode !== "auto") {
			return;
		}

		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => applyThemeMode("auto");

		media.addEventListener("change", onChange);
		return () => {
			media.removeEventListener("change", onChange);
		};
	}, [mode]);

	const toggleMode = (newMode: ThemeMode) => {
		setMode(newMode);
		applyThemeMode(newMode);
		window.localStorage.setItem("theme", newMode);
	};

	return (
		<RadioGroup
			onValueChange={toggleMode}
			value={mode}
			aria-label="Changer le thème de l'interface"
			orientation="horizontal"
		>
			{Object.entries(MODES).map(([key, { label, icon: Icon }]) => (
				<RadioGroupItem key={key} value={key} title={label}>
					<Icon strokeWidth={1.5} size={18} />
					<span className={compact ? "sr-only" : "sr-only sm:not-sr-only"}>
						{label}
					</span>
				</RadioGroupItem>
			))}
		</RadioGroup>
	);
}
