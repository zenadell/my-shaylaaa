import { useTexture } from '@react-three/drei'
import { useConfig, resolveImagePath } from '../../ConfigContext.jsx'

export default function VinylsCovers(props) {
    const { config } = useConfig()

    const pic1 = resolveImagePath(config.picture_1?.value) || './Textures/bday_cake.png'
    const pic2 = resolveImagePath(config.picture_2?.value) || './Textures/bday_flowers.png'
    const pic3 = resolveImagePath(config.picture_3?.value) || './Textures/bday_balloons.png'
    const pic4 = resolveImagePath(config.picture_4?.value) || './Textures/bday_teddy.png'
    const pic5 = resolveImagePath(config.picture_5?.value) || './Textures/bday_presents.png'

    const ULMATexture = useTexture(pic1)
    const ROCPTexture = useTexture(pic2)
    const PNLTexture = useTexture(pic3)
    const HamzaTexture = useTexture(pic4)
    const boobaTexture = useTexture(pic5)

    return <>
        <mesh
            key={pic1}
            geometry={props.nodes.LogoULMA.geometry}
            position={[3.736, 5.408, -0.575]}
            rotation={[Math.PI / 2, 0, Math.PI / 2]}
        >
            <meshBasicMaterial map={ULMATexture} map-flipY={false} />
        </mesh>

        <mesh
            key={pic2}
            geometry={props.nodes.LogoRCP.geometry}
            position={[3.701, 5.409, 0.309]}
            rotation={[Math.PI / 2, 0, Math.PI / 2]}
        >
            <meshBasicMaterial map={ROCPTexture} map-flipY={false} />
        </mesh>

        <mesh
            key={pic3}
            geometry={props.nodes.LogoPNL.geometry}
            position={[3.77, 5.102, -1.003]}
            rotation={[Math.PI / 2, 0, Math.PI / 2]}
        >
            <meshBasicMaterial map={PNLTexture} map-flipY={false} />
        </mesh>

        <mesh
            key={pic4}
            geometry={props.nodes.LogoHamza.geometry}
            position={[3.736, 5.107, -0.156]}
            rotation={[Math.PI / 2, 0, Math.PI / 2]}
        >
            <meshBasicMaterial map={HamzaTexture} map-flipY={false} />
        </mesh>

        <mesh
            key={pic5}
            geometry={props.nodes.LogoBooba.geometry}
            position={[3.686, 5.077, 0.811]}
            rotation={[Math.PI / 2, 0, Math.PI / 2]}
        >
            <meshBasicMaterial map={boobaTexture} map-flipY={false} />
        </mesh>
    </>
}