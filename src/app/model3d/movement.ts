import * as THREE from "three"
import { Model3dComponent } from "./model3d.component"

export class Movement {

    brace_down_dx:IPartOfBody  = {model: Model3dComponent.partOfBody.children[0], initial_position: Model3dComponent.partOfBody.children[0].position, initial_rotation: Model3dComponent.partOfBody.children[0].rotation}
    brace_down_sx:IPartOfBody  = {model: Model3dComponent.partOfBody.children[1], initial_position: Model3dComponent.partOfBody.children[1].position, initial_rotation: Model3dComponent.partOfBody.children[1].rotation}
    brace_upper_dx:IPartOfBody  = {model: Model3dComponent.partOfBody.children[2], initial_position: Model3dComponent.partOfBody.children[2].position, initial_rotation: Model3dComponent.partOfBody.children[2].rotation}
    brace_upper_sx:IPartOfBody  = {model: Model3dComponent.partOfBody.children[3], initial_position: Model3dComponent.partOfBody.children[3].position, initial_rotation: Model3dComponent.partOfBody.children[3].rotation}
    foot_dx:IPartOfBody  = {model: Model3dComponent.partOfBody.children[4], initial_position: Model3dComponent.partOfBody.children[4].position, initial_rotation: Model3dComponent.partOfBody.children[4].rotation}
    foot_sx:IPartOfBody  = {model: Model3dComponent.partOfBody.children[5], initial_position: Model3dComponent.partOfBody.children[5].position, initial_rotation: Model3dComponent.partOfBody.children[5].rotation}
    hand_dx:IPartOfBody  = {model: Model3dComponent.partOfBody.children[6], initial_position: Model3dComponent.partOfBody.children[6].position, initial_rotation: Model3dComponent.partOfBody.children[6].rotation}
    hand_sx:IPartOfBody  = {model: Model3dComponent.partOfBody.children[7], initial_position: Model3dComponent.partOfBody.children[7].position, initial_rotation: Model3dComponent.partOfBody.children[7].rotation}
    head:IPartOfBody  = {model: Model3dComponent.partOfBody.children[8], initial_position: Model3dComponent.partOfBody.children[8].position, initial_rotation: Model3dComponent.partOfBody.children[8].rotation}
    leg_down_dx:IPartOfBody  = {model: Model3dComponent.partOfBody.children[9], initial_position: Model3dComponent.partOfBody.children[9].position, initial_rotation: Model3dComponent.partOfBody.children[9].rotation}
    leg_down_sx:IPartOfBody  = {model: Model3dComponent.partOfBody.children[10], initial_position: Model3dComponent.partOfBody.children[10].position, initial_rotation: Model3dComponent.partOfBody.children[10].rotation}
    leg_upper_dx:IPartOfBody  = {model: Model3dComponent.partOfBody.children[11], initial_position: Model3dComponent.partOfBody.children[11].position, initial_rotation: Model3dComponent.partOfBody.children[11].rotation}
    leg_upper_sx:IPartOfBody  = {model: Model3dComponent.partOfBody.children[12], initial_position: Model3dComponent.partOfBody.children[12].position, initial_rotation: Model3dComponent.partOfBody.children[12].rotation}
    trunk:IPartOfBody  = {model: Model3dComponent.partOfBody.children[13], initial_position: Model3dComponent.partOfBody.children[13].position, initial_rotation: Model3dComponent.partOfBody.children[13].rotation}

    constructor () {
        
    }

    moveBraceUpperDx(velocity: number, spin:number = -1, maxRotation: number = 2*Math.PI) {
        if (this.brace_upper_dx.model.rotation.x <= maxRotation && this.brace_upper_dx.model.rotation.x >= -maxRotation) {

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

        let diffAngleBdBu = this.brace_down_dx.model.rotation.x - this.brace_upper_dx.model.rotation.x + spin*0.01

        if (diffAngleBdBu < 0 &&
            diffAngleBdBu > -Math.PI + 0.14 &&
            diffAngleBdBu > -maxRotation) {

            this.brace_down_dx.model.rotation.x = this.brace_down_dx.model.rotation.x + spin*velocity
    
            let angleBraceDownDx = this.brace_down_dx.model.rotation.x
            
            this.hand_dx.model.rotation.x = this.hand_dx.model.rotation.x + spin*velocity
            
    
            this.hand_dx.model.position.y = 2*Math.sin(angleBraceDownDx) + this.brace_down_dx.model.position.y
            this.hand_dx.model.position.z = -2*Math.cos(angleBraceDownDx) + this.brace_down_dx.model.position.z
        }
        
        
    }

    moveBraceUpperSx(velocity: number, spin:number = -1, maxRotation: number = 2*Math.PI) {
        if (this.brace_upper_sx.model.rotation.x <= maxRotation && 
            this.brace_upper_sx.model.rotation.x >= -maxRotation) {

            this.brace_upper_sx.model.rotation.x = this.brace_upper_sx.model.rotation.x + spin*velocity
    
            let angleBraceUpperSx = this.brace_upper_sx.model.rotation.x
    
            this.brace_down_sx.model.rotation.x = this.brace_down_sx.model.rotation.x + spin*velocity
            
            this.hand_sx.model.rotation.x = this.hand_sx.model.rotation.x + spin*velocity
            
            
            this.brace_down_sx.model.position.y = 2*Math.sin(angleBraceUpperSx) + this.brace_upper_sx.model.position.y
            this.brace_down_sx.model.position.z = -2.65*Math.cos(angleBraceUpperSx) + this.brace_upper_sx.model.position.z
    
            this.hand_sx.model.position.y = 2*Math.sin(angleBraceUpperSx) + this.brace_down_sx.model.position.y
            this.hand_sx.model.position.z = -2*Math.cos(angleBraceUpperSx) + this.brace_down_sx.model.position.z
        }
    }

    moveBraceDownSx(velocity: number, spin:number = -1, maxRotation: number =  Math.PI - 0.14) {

        let diffAngleBdBu = this.brace_down_sx.model.rotation.x - this.brace_upper_sx.model.rotation.x + spin*0.01

        if (diffAngleBdBu < 0 &&
            diffAngleBdBu > -Math.PI + 0.14 &&
            diffAngleBdBu > -maxRotation) {

            this.brace_down_sx.model.rotation.x = this.brace_down_sx.model.rotation.x + spin*velocity
    
            let angleBraceDownSx = this.brace_down_sx.model.rotation.x
            
            this.hand_sx.model.rotation.x = this.hand_sx.model.rotation.x + spin*velocity
            
    
            this.hand_sx.model.position.y = 2*Math.sin(angleBraceDownSx) + this.brace_down_sx.model.position.y
            this.hand_sx.model.position.z = -2*Math.cos(angleBraceDownSx) + this.brace_down_sx.model.position.z
        }
        
    }

    moveHandSx(velocity: number, spin:number = -1, maxRotation: number = Math.PI/4) {
        let diffAngleHBdBu = this.hand_sx.model.rotation.x - this.brace_down_sx.model.rotation.x - this.brace_upper_sx.model.rotation.x + spin*0.01


        if (diffAngleHBdBu < Math.PI/4 &&
            diffAngleHBdBu < maxRotation &&
            diffAngleHBdBu > -Math.PI/4 &&
            diffAngleHBdBu > -maxRotation) {
                this.hand_sx.model.rotation.x = this.hand_sx.model.rotation.x + spin*velocity

            }

    }

    moveHead(velocity: number, spin:number = -1, maxRotation: number = Math.PI/2) {
        let diffAngleHeadTrunk = this.head.model.rotation.z - this.trunk.model.rotation.z

        if (diffAngleHeadTrunk < Math.PI/2 &&
        diffAngleHeadTrunk < maxRotation &&
        diffAngleHeadTrunk > -Math.PI/2 &&
        diffAngleHeadTrunk > -maxRotation) {
            this.head.model.rotation.z = this.head.model.rotation.z + spin*velocity

            this.head.model.position.x = 0.07*Math.sin(this.head.model.rotation.z)

        }

    }

    moveKneeDxUpper(velocity: number, spin:number = -1, maxRotation: number = Math.PI/2) {
        if (this.leg_upper_dx.model.rotation.x <= maxRotation && this.leg_upper_dx.model.rotation.x >= -maxRotation) {

            this.leg_upper_dx.model.rotation.x = this.leg_upper_dx.model.rotation.x + spin*velocity
    
            let angleLegUpperDx = this.leg_upper_dx.model.rotation.x
    

            
            
            this.leg_down_dx.model.position.y = 3*Math.sin(angleLegUpperDx) + this.leg_upper_dx.model.position.y
            this.leg_down_dx.model.position.z = -3*Math.cos(angleLegUpperDx) + this.leg_upper_dx.model.position.z
    
            this.foot_dx.model.position.y = 3.2 + this.leg_down_dx.model.position.y
            this.foot_dx.model.position.z = -4.5 + this.leg_down_dx.model.position.z
        }
    }

    moveKneeSxUpper(velocity: number, spin:number = -1, maxRotation: number = Math.PI/2) {
        if (this.leg_upper_sx.model.rotation.x <= maxRotation && this.leg_upper_sx.model.rotation.x >= -maxRotation) {

            this.leg_upper_sx.model.rotation.x = this.leg_upper_sx.model.rotation.x + spin*velocity
    
            let angleLegUpperSx = this.leg_upper_sx.model.rotation.x
    

            
            
            this.leg_down_sx.model.position.y = 3*Math.sin(angleLegUpperSx) + this.leg_upper_sx.model.position.y
            this.leg_down_sx.model.position.z = -3*Math.cos(angleLegUpperSx) + this.leg_upper_sx.model.position.z
    
            this.foot_sx.model.position.x = 0.25 + this.leg_down_sx.model.position.x
            this.foot_sx.model.position.y = 5 + this.leg_down_sx.model.position.y
            this.foot_sx.model.position.z = -4.35 + this.leg_down_sx.model.position.z
        }
    }

    getSize(elem1: any, elem2: any) {
        // return Math.sqrt(Math.pow(elem1.position.x - elem2.position.x,2) + Math.pow(elem1.position.y - elem2.position.y,2) + Math.pow(elem1.position.z - elem2.position.z,2))

        return elem1.manhattanDistanceTo(elem2)
    }

    resetAngles() {

        for (let elem in this) {
            let prop: any = this[elem]
            if (prop.model) {
                if (prop.model.rotation.x >= 2*Math.PI) {
                    prop.model.rotation.x = prop.model.rotation.x - Math.ceil(prop.model.rotation.x/2*Math.PI)*2*Math.PI
                } 

                if (prop.model.rotation.y >= 2*Math.PI) {
                    prop.model.rotation.y = prop.model.rotation.y - Math.ceil(prop.model.rotation.y/2*Math.PI)*2*Math.PI
                } 

                if (prop.model.rotation.z >= 2*Math.PI) {
                    prop.model.rotation.z = prop.model.rotation.z - Math.ceil(prop.model.rotation.z/2*Math.PI)*2*Math.PI
                } 

                if (prop.model.rotation.x <= -2*Math.PI) {
                    prop.model.rotation.x = prop.model.rotation.x - Math.ceil(prop.model.rotation.x/2*Math.PI)*2*Math.PI
                } 

                if (prop.model.rotation.y <= -2*Math.PI) {
                    prop.model.rotation.y = prop.model.rotation.y - Math.ceil(prop.model.rotation.y/2*Math.PI)*2*Math.PI
                } 

                if (prop.model.rotation.z <= -2*Math.PI) {
                    prop.model.rotation.z = prop.model.rotation.z - Math.ceil(prop.model.rotation.z/2*Math.PI)*2*Math.PI
                } 
            }
        }
    }
}

export class IPartOfBody {
    model: any
    initial_position: any
    initial_rotation: any
}