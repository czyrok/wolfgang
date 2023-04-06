import { PropertyDependencyBuildInterface } from '../property/interface/property.dependency.build.interface'

export interface DependencyBuildInterface {
    assignedName: string | undefined
    properties: Array<PropertyDependencyBuildInterface>
}