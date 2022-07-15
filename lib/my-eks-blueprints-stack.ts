// import { Stack, StackProps } from 'aws-cdk-lib';
// import { Construct } from 'constructs';
// // import * as sqs from 'aws-cdk-lib/aws-sqs';

// export class MyEksBlueprintsStack extends Stack {
//   constructor(scope: Construct, id: string, props?: StackProps) {
//     super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'MyEksBlueprintsQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
//   }
// }


// lib/my-eks-blueprints-stack.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as blueprints from '@aws-quickstart/eks-blueprints';

export default class ClusterConstruct extends Construct {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    const account = props?.env?.account!;
    const region = props?.env?.region!;

    const blueprint = blueprints.EksBlueprint.builder()
    .account(account)
    .region(region)
    .addOns()
    .teams()
    .build(scope, id+"-stack");
  }
}
