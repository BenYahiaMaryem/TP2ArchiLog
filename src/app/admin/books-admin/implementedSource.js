import { Ng2SmartTableModule, ServerDataSource, Grid } from 'ng2-smart-table';
export class implmentedSource implements ServerDataSource{
 source: ServerDataSource


  public extractDataFromResponse(res: any): Array<any> {
    const rawData = res.json();
    const data = !!this.conf.dataKey ? getDeepFromObject(rawData, this.conf.dataKey, []) : rawData;

    if (data instanceof Array) {
      return data;
    }

    throw new Error(`Data must be an array.
    Please check that data extracted from the server response by the key '${this.conf.dataKey}' exists and is array.`);
  }
}