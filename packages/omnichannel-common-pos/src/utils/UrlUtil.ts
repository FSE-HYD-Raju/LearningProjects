
class UrlUtil {
    /*  This method will return part of the string which holds query parameters available from input string 'pathname'        based on the input string 'key' */
    static getQueryString (pathname: string, key: string) {
        const questionMarkIndexInPathname = pathname.indexOf(key);
        let queryString = "";
        if (questionMarkIndexInPathname !== -1) {
            queryString = pathname.substring(questionMarkIndexInPathname, pathname.length);
        }
        return queryString;
    }
}

export default UrlUtil;
