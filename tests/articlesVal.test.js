import { expect,request,use } from "chai";
import chaiHttp from "chai-http";
import app from '../src/validations/articleValidation'

use (chaiHttp) 
before (()=> {});

let articleVal 
describe ('ARTICLE END-POINT')