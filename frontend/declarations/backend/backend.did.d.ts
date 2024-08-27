import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface BlogCreationStep {
  'id' : bigint,
  'title' : string,
  'description' : string,
  'prompt' : string,
}
export type Result = { 'ok' : BlogCreationStep } |
  { 'err' : string };
export interface _SERVICE {
  'getBlogCreationSteps' : ActorMethod<[], Array<BlogCreationStep>>,
  'updateBlogCreationStep' : ActorMethod<[bigint, BlogCreationStep], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
