declare interface IErrorApp<TOwner>
 extends IApp<TOwner, IPartAny> {

 // Components.
 /** The status code for the error response. */
 readonly "status": string
 /** The displayed error message. */
 readonly "message.html": string
 /** Returns the CSS for a stylized error page using the given message to compute the dynamic font size. */
 readonly getErrorCSS(MESSAGE: string): string
 /** Returns a stylized error page for the given message and status. */
 readonly getErrorHTML(STATUS: string | number, MESSAGE: string): string
 /** Returns an object based on the given error string which can be used to update an error response. */
 readonly getErrorResponse(ERROR_STRING: string, REQUEST_HOST: string): string
}

declare type IErrorAppAny =
 IErrorApp<ITopLevelDomain<IErrorAppAny>>

declare const thisErrorApp: IErrorAppAny

declare const ERROR_STRING: string
declare const REQUEST_HOST: string