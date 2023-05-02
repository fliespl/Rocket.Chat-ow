/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';

import { Apps } from '../../../../ee/server/apps';
import { Info } from '../../../utils/server';

export function getAppsStatistics() {
	return {
		engineVersion: Info.marketplaceApiVersion,
		totalInstalled: Apps.isInitialized() && Apps.getManager()!.get().length,
		totalActive: Apps.isInitialized() && Apps.getManager()!.get({ enabled: true }).length,
		totalFailed:
			Apps.isInitialized() &&
			Apps.getManager()!
				.get({ disabled: true })
				// @ts-expect-error - accessing private property `app`
				.filter(({ app: { status } }) => status !== AppStatus.MANUALLY_DISABLED).length,
	};
}
