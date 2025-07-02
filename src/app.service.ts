import { Injectable } from '@nestjs/common';
import { TableClient, AzureNamedKeyCredential } from "@azure/data-tables";
import { randomUUID } from 'crypto';
import { Logs } from './models/logs.dto';
@Injectable()
export class AppService {
 

  async createLog(data: Logs): Promise<string> {
    const account: string = process.env.ACCOUNT_NAME!;
    const accountId: string = process.env.ACCOUNT_KEY!;
    const tableName: string = process.env.TABLE_NAME!;

    const credential = new AzureNamedKeyCredential(account, accountId);
    const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);

    const testEntity = {
      partitionKey: "P1",
      rowKey: randomUUID(),
      message: data.message,
      stackTrace: data.stackTrace,
      level: data.level,
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
