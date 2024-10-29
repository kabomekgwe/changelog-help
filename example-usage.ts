// Example of how to use the services
import { ChangeLogService } from './changelog/changelog.service';
import { UserLogService } from './user-log/user-log.service';

// In your service or controller:
async function exampleUsage(
  changeLogService: ChangeLogService,
  userLogService: UserLogService,
) {
  // Log a user action
  await userLogService.logUserAction({
    userId: 1,
    action: 'LOGIN',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0...',
  });

  // Log a change to an entity
  await changeLogService.logChange({
    entityType: 'User',
    entityId: '1',
    userId: 1,
    changeType: 'UPDATE',
    oldValue: { name: 'Old Name' },
    newValue: { name: 'New Name' },
  });

  // Get change history for an entity
  const changes = await changeLogService.getChangesByEntity('User', '1');

  // Get user activity logs
  const userLogs = await userLogService.getUserLogs(1);
}