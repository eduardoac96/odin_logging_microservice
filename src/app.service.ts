import { Injectable } from '@nestjs/common';
import { TableClient, AzureNamedKeyCredential } from "@azure/data-tables";
import { randomUUID } from 'crypto';
import { Logs } from './models/logs.dto';
@Injectable()
export class AppService {
 

  async createLog(data: Logs): Promise<string> {
    const account: string = 'odinstgaccount2';
    const accountKey: string = 'dWfJlxyiUUP8O/uX4oYG+OZpCJ7W7VWLB19Cj94waR98t/Hhp4Kp7yRZzlVuXpJ4/iVgScieosTm+AStx56BCA==';
    const tableName: string = 'OdinAppLogs';

    const credential = new AzureNamedKeyCredential(account, accountKey);
    const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);

    const testEntity = {
      partitionKey: "P1",
      rowKey: randomUUID(),
      message: data.message,
      stackTrace: data.stackTrace,
      level: data.level,
      timestamp: new Date().toISOString(),
    };
    try {
      await client.createEntity(testEntity);
      return 'Log created successfully';

    } catch (error) {
      console.error('Error creating log:', error);
      throw error;
    }


  }

  getHello(): string {
    return 'Hello World!';
  }
 
}
