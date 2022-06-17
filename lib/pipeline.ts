// lib/pipeline.ts
import * as cdk from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { Construct } from 'constructs';

import { TeamPlatform, TeamApplication } from '../teams'; // HERE WE IMPORT TEAMS


export default class PipelineConstruct extends Construct {
  constructor(scope: Construct, id: string, props?: cdk.StackProps){
    super(scope,id)

    const account = props?.env?.account!;
    const region = props?.env?.region!;

    const blueprint = blueprints.EksBlueprint.builder()
    .account(account)
    .region(region)
    .addOns()
    .teams(new TeamPlatform(account), new TeamApplication('burnham',account));
  
    blueprints.CodePipelineStack.builder()
      .name("eks-blueprints-workshop-pipeline")
      .owner("shreyarm-aws")
      .repository({
          repoUrl: 'my-eks-blueprints',
          credentialsSecretName: 'githubs-token',
          targetRevision: 'main'
      })
      .wave({
        id: "envs",
        stages: [
          { id: "dev", stackBuilder: blueprint.clone('us-west-2')},
          { id: "test", stackBuilder: blueprint.clone('us-east-2')},
          { id: "prod", stackBuilder: blueprint.clone('us-east-1')}
        ]
      })
      .build(scope, id+'-stack', props);
  }
}
