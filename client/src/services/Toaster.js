import { Toaster } from "@blueprintjs/core";
export const BottomToaster = Toaster.create({autoFocus:true,canEscapeKeyClear:true, usePortal:true, position:'bottom-right'});
export const AppToaster = Toaster.create({autoFocus:true,canEscapeKeyClear:true, usePortal:true, position:'top-right'});
export const AnonymousToaster = Toaster.create({autoFocus:true,canEscapeKeyClear:true});
