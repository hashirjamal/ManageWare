// your-dialog.jsx
import React, { useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";

export const DialogContent = React.forwardRef(
	({ children, ...props }, forwardedRef) => { 
        
useEffect(()=>{
console.log(children)
},[])

        return (
		<DialogPrimitive.Portal>
			<DialogPrimitive.Overlay />
           <DialogPrimitive.Title>Hello</DialogPrimitive.Title>
			<DialogPrimitive.Content {...props} aria-describedby={undefined} ref={forwardedRef}>
				{children}
				<DialogPrimitive.Close aria-label="Close">
					<Cross1Icon />
				</DialogPrimitive.Close>
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	)
});

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
