// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApi from '../../../app/model/api';
import ExportClass from '../../../app/model/class';
import ExportItem from '../../../app/model/item';
import ExportUser from '../../../app/model/user';
import ExportWorkspace from '../../../app/model/workspace';

declare module 'egg' {
  interface IModel {
    Api: ReturnType<typeof ExportApi>;
    Class: ReturnType<typeof ExportClass>;
    Item: ReturnType<typeof ExportItem>;
    User: ReturnType<typeof ExportUser>;
    Workspace: ReturnType<typeof ExportWorkspace>;
  }
}
