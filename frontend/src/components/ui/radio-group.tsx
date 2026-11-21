import { cn } from "cn";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

function RadioGroup({
	className,
	...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
	return (
		<RadioGroupPrimitive.Root
			data-slot="radio-group"
			className={cn(
				"inline-flex gap-0.5 p-0.75 rounded-full border border-border bg-surface-raised",
				className,
			)}
			{...props}
		/>
	);
}

function RadioGroupItem({
	className,
	...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
	return (
		<RadioGroupPrimitive.Item
			data-slot="radio-group-item"
			className={cn(
				"flex items-center gap-2 cursor-pointer px-3 h-10 shrink-0 rounded-full text-label text-muted-foreground hover:text-foreground data-[state=checked]:bg-accent data-[state=checked]:text-foreground data-[state=checked]:font-bold focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
				className,
			)}
			{...props}
		></RadioGroupPrimitive.Item>
	);
}

export { RadioGroup, RadioGroupItem };
