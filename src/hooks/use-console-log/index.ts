/**
 * Logs on the second param parsed every time that this changes
 *
 */

import { useEffect } from 'react';

function useConsoleLog(param: any): void {
	useEffect(() => {
		console.log('%cParam: ', 'color: blue', param);
	}, [param]);
}

export default useConsoleLog;
