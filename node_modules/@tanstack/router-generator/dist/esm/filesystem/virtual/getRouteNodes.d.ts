import { VirtualRouteNode } from '@tanstack/virtual-file-routes';
import { GetRouteNodesResult, RouteNode } from '../../types';
import { Config } from '../../config';
export declare function getRouteNodes(tsrConfig: Config): Promise<GetRouteNodesResult>;
export declare function getRouteNodesRecursive(tsrConfig: Config, fullDir: string, nodes?: Array<VirtualRouteNode>, parent?: RouteNode): Promise<Array<RouteNode>>;
