import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { HitCounter } from "./hitcounter";
// import { TableViewer } from "cdk-dynamo-table-viewer";
export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // defines an aws lambda resource
    const hello = new lambda.Function(this, "HelloHandler", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("lambda"), // code loaded from lambda directory
      handler: "hello.handler", // file is 'hello', function is 'handler'
    });

    const helloWithCounter = new HitCounter(this, "HelloHitCounter", {
      downstream: hello,
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    new apigw.LambdaRestApi(this, "Endpoint", {
      handler: helloWithCounter.handler,
    });

    // USES AN OUTDATED NOTE VERSION
    // new TableViewer(this, "ViewHitCounter", {
    //   title: "Hello Hits",
    //   table: helloWithCounter.table,
    // });
  }
}

/*
The class constructors of both CdkWorkshopStack and lambda.Function (and many other classes in the CDK)
have the signature (scope, id, props). This is because all of these classes are constructs. 
Constructs are the basic building block of CDK apps. They represent abstract “cloud components” which can
be composed together into higher level abstractions via scopes. 
Scopes can include constructs, which in turn can include other constructs, etc.
// More info here: https://cdkworkshop.com/20-typescript/30-hello-cdk/200-lambda.html
*/
