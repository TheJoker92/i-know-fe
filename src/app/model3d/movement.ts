import * as THREE from "three"
import { Model3dComponent } from "./model3d.component"

export class Movement {

    body = {model: Model3dComponent.body.children[0], initial_position: Model3dComponent.body.children[0].position, initial_rotation: Model3dComponent.body.children[0].rotation}
    brace_down_dx = {model: Model3dComponent.partOfBody.children[0], initial_position: Model3dComponent.partOfBody.children[0].position, initial_rotation: Model3dComponent.partOfBody.children[0].rotation}
    brace_down_sx = Model3dComponent.partOfBody.children[1]
    brace_upper_dx = {model: Model3dComponent.partOfBody.children[2], initial_position: Model3dComponent.partOfBody.children[2].position, initial_rotation: Model3dComponent.partOfBody.children[2].rotation}
    brace_upper_sx = Model3dComponent.partOfBody.children[3]
    foot_dx = Model3dComponent.partOfBody.children[4]
    foot_sx = Model3dComponent.partOfBody.children[5]
    hand_dx = {model: Model3dComponent.partOfBody.children[6], initial_position: Model3dComponent.partOfBody.children[6].position, initial_rotation: Model3dComponent.partOfBody.children[6].rotation}
    hand_sx = Model3dComponent.partOfBody.children[7]
    head = Model3dComponent.partOfBody.children[8]
    leg_down_dx = Model3dComponent.partOfBody.children[9]
    leg_down_sx = Model3dComponent.partOfBody.children[10]
    leg_upper_dx = Model3dComponent.partOfBody.children[11]
    leg_upper_sx = Model3dComponent.partOfBody.children[12]
    trunk = Model3dComponent.partOfBody.children[13]

    constructor () {
        
    }

    moveBraceUpperDx(velocity: number, spin:number = -1, maxRoration: number = 2*Math.PI) {
        if (this.brace_upper_dx.model.rotation.x <= maxRoration && this.brace_upper_dx.model.rotation.x >= -maxRoration) {

            this.brace_upper_dx.model.rotation.x = this.brace_upper_dx.model.rotation.x + spin*velocity
    
            let angleBraceUpperDx = this.brace_upper_dx.model.rotation.x
    
            this.brace_down_dx.model.rotation.x = this.brace_down_dx.model.rotation.x + spin*velocity
            
            this.hand_dx.model.rotation.x = this.hand_dx.model.rotation.x + spin*velocity
            
            
            this.brace_down_dx.model.position.y = 2*Math.sin(angleBraceUpperDx) + this.brace_upper_dx.model.position.y
            this.brace_down_dx.model.position.z = -2.65*Math.cos(angleBraceUpperDx) + this.brace_upper_dx.model.position.z
    
            this.hand_dx.model.position.y = 2*Math.sin(angleBraceUpperDx) + this.brace_down_dx.model.position.y
            this.hand_dx.model.position.z = -2*Math.cos(angleBraceUpperDx) + this.brace_down_dx.model.position.z
        }
    }

    moveBraceDownDx(velocity: number, spin:number = -1, maxRotation: number =  Math.PI - 0.14) {

        let diffAngleBdBu = this.brace_down_dx.model.rotation.x - this.brace_upper_dx.model.rotation.x

        
            this.brace_down_dx.model.rotation.x = this.brace_down_dx.model.rotation.x + spin*velocity
    
            let angleBraceDownDx = this.brace_down_dx.model.rotation.x
            
            this.hand_dx.model.rotation.x = this.hand_dx.model.rotation.x + spin*velocity
            
    
            this.hand_dx.model.position.y = 2*Math.sin(angleBraceDownDx) + this.brace_down_dx.model.position.y
            this.hand_dx.model.position.z = -2*Math.cos(angleBraceDownDx) + this.brace_down_dx.model.position.z
        
    }

    getSize(elem1: any, elem2: any) {
        // return Math.sqrt(Math.pow(elem1.position.x - elem2.position.x,2) + Math.pow(elem1.position.y - elem2.position.y,2) + Math.pow(elem1.position.z - elem2.position.z,2))

        return elem1.manhattanDistanceTo(elem2)
    }
}