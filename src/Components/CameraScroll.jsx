import { useLayoutEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, useTexture, Text } from '@react-three/drei'
import { FrontSide } from 'three'
import { useConfig, t, autoSize } from '../ConfigContext.jsx'

import gsap from 'gsap'

import TvScreen from './House/TvScreen.jsx'

export default function CameraScroll(props) {
    const { config } = useConfig()

    const DoorTexture = useTexture('./Textures/DoorBaked.jpg')

    const { camera, size } = useThree((state) => ({ camera: state.camera, size: state.size }));
    const isMobile = size.width < 1000;
    const mS = isMobile ? 0.5 : 1;


    const doorRef = useRef()
    const tlRef = useRef()

    const reactTextRef = useRef()
    const symfonyTextRef = useRef()
    const threejsTextRef = useRef()
    const blenderTextRef = useRef()

    const pythonTextRef = useRef()
    const htmlTextRef = useRef()
    const cssTextRef = useRef()
    const javascriptTextRef = useRef()

    const threejsCertificationTextRef1 = useRef()
    const threejsCertificationTextRef2 = useRef()

    const dut1TextRef = useRef()
    const dut2TextRef = useRef()
    const dut3TextRef = useRef()

    const licence1TextRef = useRef()
    const licence2TextRef = useRef()
    const licence3TextRef = useRef()

    const master1TextRef = useRef()
    const master2TextRef = useRef()
    const master3TextRef = useRef()

    const tabShader1TextRef = useRef()
    const tabShader2TextRef = useRef()


    const particlesShaderTextRef = useRef()

    const vinyls1TextRef = useRef()
    const vinyls2TextRef = useRef()

    const sport1TextRef = useRef()
    const sport2TextRef = useRef()

    const seeyouTextRef = useRef()

    const [progress, setProgress] = useState(1)
    const [opacity, setOpacity] = useState(0)

    const scroll = useScroll()

    useFrame((state, delta) => {
        tlRef.current.seek(scroll.offset * tlRef.current.duration())
    })

    useLayoutEffect(() => {
        // Set initial opacity imperatively so config polling re-renders don't reset it
        const textRefs = [
            reactTextRef, threejsTextRef, symfonyTextRef, blenderTextRef,
            pythonTextRef, htmlTextRef, cssTextRef, javascriptTextRef,
            threejsCertificationTextRef1, threejsCertificationTextRef2,
            dut1TextRef, dut2TextRef, dut3TextRef,
            licence1TextRef, licence2TextRef, licence3TextRef,
            master1TextRef, master2TextRef, master3TextRef,
            tabShader1TextRef, tabShader2TextRef,
            particlesShaderTextRef,
            vinyls1TextRef, vinyls2TextRef,
            sport1TextRef, sport2TextRef,
            seeyouTextRef,
        ]
        textRefs.forEach(ref => {
            if (ref.current?.material) {
                ref.current.material.opacity = 0
                ref.current.material.transparent = true
            }
        })

        tlRef.current = gsap.timeline()

        // GO TO DOOR
        tlRef.current.to(
            camera.position,
            {

                duration: 2,
                x: 7.7,
                y: 3,
                z: -2.5,

            },
        )
        tlRef.current.to(
            camera.rotation,
            {
                x: 0,
                y: Math.PI / 2,
                z: 0,

            }, "<60%"
        )
        //OPEN DOOR
        tlRef.current.to(
            doorRef.current.rotation,
            {
                duration: 2,
                y: -Math.PI / 2,

            },
        )

        //FO THROUGH THE DOOR
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: 3.4
            }
        )

        //GO TO REACT MUG
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: isMobile ? 2.25 : 2.3,
                y: 2.6,
                z: isMobile ? 0.6 : 0.3,
            },
        )
        tlRef.current.to(
            camera.rotation,
            {
                duration: 2,
                x: 0,
                y: Math.PI,
                z: 0,

            }, "<"
        )
        tlRef.current.to(
            reactTextRef.current.material,
            {
                opacity: 1,
            }, "<40%"
        )



        // GO TO SYMFONY/THREEJS MUG
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: isMobile ? 3.15 : 3.3,
                y: 3.6,
                z: isMobile ? 2.8 : 2.3,
            }
        )
        tlRef.current.to(
            symfonyTextRef.current.material,
            {
                opacity: 1,
            }, "<40%"
        )
        tlRef.current.to(
            threejsTextRef.current.material,
            {
                opacity: 1,
            }, "<"
        )

        //GO TO BLENDER MUG
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: isMobile ? 1.65 : 1.8,
                y: 2.75,
                z: isMobile ? 2.55 : 2.4,
            }
        )

        tlRef.current.to(
            camera.rotation,
            {
                duration: 2,
                x: 0,
                y: 3 * Math.PI / 4,
                z: 0,

            }, "<"
        )
        tlRef.current.to(
            blenderTextRef.current.material,
            {
                opacity: 1,
            }, "<40%"
        )

        //GO IN BATHROOM
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: 0,
                y: 3,
                z: 1.3,
            }
        )
        tlRef.current.to(
            camera.rotation,
            {
                duration: 2,
                x: 0,
                y: Math.PI / 2,
                z: 0,

            }, "<"
        )

        //GO TO PYTHON SOAP
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: isMobile ? -1.5 : -1.38,
                y: 3,
                z: isMobile ? 0.4 : 0.8,
            }
        )
        tlRef.current.to(
            camera.rotation,
            {
                duration: 2,
                x: 0,
                y: Math.PI / 6,
                z: 0,

            }, "<"
        )
        tlRef.current.to(
            pythonTextRef.current.material,
            {
                opacity: 1,
            }, "<40%"
        )
        //GO TO HTML SOAP
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: isMobile ? -3.5 : -3.3,
                y: 2.5,
                z: isMobile ? 0.75 : 1,
            }
        )
        tlRef.current.to(
            camera.rotation,
            {
                duration: 2,
                x: 0,
                y: Math.PI / 4,
                z: 0,

            }, "<"
        )
        tlRef.current.to(
            htmlTextRef.current.material,
            {
                opacity: 1,
            }, "<40%"
        )

        //GO TO CSS SOAP
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: isMobile ? -3.35 : -3,
                y: 2.5,
                z: isMobile ? 2.22 : 2.3,
            }
        )
        tlRef.current.to(
            camera.rotation,
            {
                duration: 2,
                x: 0,
                y: Math.PI / 2,
                z: 0,

            }, "<"
        )
        tlRef.current.to(
            cssTextRef.current.material,
            {
                opacity: 1,
            }, "<40%"
        )

        //GO TO JS SOAP
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: isMobile ? -2.65 : -2.4,
                y: 2.5,
                z: isMobile ? 3.2 : 3,
            }
        )
        tlRef.current.to(
            camera.rotation,
            {
                duration: 2,
                x: 0,
                y: 5 * Math.PI / 6,
                z: 0,

            }, "<"
        )
        tlRef.current.to(
            javascriptTextRef.current.material,
            {
                opacity: 1,
            }, "<40%"
        )

        //EXIT BATHROOM
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: -1.8,
                y: 3,
                z: 1.1,
            }
        )
        tlRef.current.to(
            camera.rotation,
            {
                duration: 2,
                x: 0,
                y: 3 * Math.PI / 2,
                z: 0,

            }, "<"
        )
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: 0.5,
                y: 3,
                z: 1.1,
            }
        )
        tlRef.current.to(
            camera.rotation,
            {
                duration: 2,
                x: 0,
                y: Math.PI * 2,
                z: 0,

            }, "<"
        )


        //GO TO THEEJS JOURNEY CERTIFICATION 
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: isMobile ? 0 : 0.3,
                y: 2.9,
                z: isMobile ? -1.7 : -1.3,
            }
        )
        tlRef.current.to(
            camera.rotation,
            {
                duration: 2,
                x: 0,
                y: (5 * Math.PI) / 2,
                z: 0,

            }, "<"
        )
        tlRef.current.to(
            threejsCertificationTextRef1.current.material,
            {
                opacity: 1,
            }, "<40%"
        )
        tlRef.current.to(
            threejsCertificationTextRef2.current.material,
            {
                opacity: 1,
            }, "<%"
        )


        // GO TO THE STAIR
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: 0.3,
                y: 2.9,
                z: -3.2,
            }
        )

        //GO TO TROPHEES : first text
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: isMobile ? -1.1 : -0.6,
                y: 3.2,
                z: isMobile ? -3.5 : -3.2,
            }
        )
        tlRef.current.to(
            dut1TextRef.current.material,
            {
                opacity: 1,
            }, "<40%"
        )
        tlRef.current.to(
            dut2TextRef.current.material,
            {
                opacity: 1,
            }, "<"
        )
        tlRef.current.to(
            dut3TextRef.current.material,
            {
                opacity: 1,
            }, "<"
        )

        //GO TO TROPHEES : second text
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: isMobile ? -1.3 : -1.7,
                y: 3.5,
                z: isMobile ? -3.2 : -3.2,
            }
        )
        tlRef.current.to(
            licence1TextRef.current.material,
            {
                opacity: 1,
            }, "<40%"
        )
        tlRef.current.to(
            licence2TextRef.current.material,
            {
                opacity: 1,
            }, "<"
        )
        tlRef.current.to(
            licence3TextRef.current.material,
            {
                opacity: 1,
            }, "<"
        )


        //GO TO TROPHEES : third text
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: isMobile ? -2.3 : -2.9,
                y: 3.9,
                z: isMobile ? -3.0 : -3.2,
            }
        )
        tlRef.current.to(
            master1TextRef.current.material,
            {
                opacity: 1,
            }, "<40%"
        )
        tlRef.current.to(
            master2TextRef.current.material,
            {
                opacity: 1,
            }, "<"
        )
        tlRef.current.to(
            master3TextRef.current.material,
            {
                opacity: 1,
            }, "<"
        )


        //GO NEXT FLOOR
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: -3.3,
                y: 5.2,
                z: -1.3,
            }
        )
        tlRef.current.to(
            camera.rotation,
            {
                duration: 2,
                x: 0,
                y: 3 * Math.PI,
                z: 0,

            }, "<"
        )

        //GO TO THE BEDROOM
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: -3.3,
                y: 5.2,
                z: 0,
            }
        )
        tlRef.current.to(
            camera.rotation,
            {
                duration: 2,
                x: 0,
                y: (7 * Math.PI) / 2,
                z: 0,

            }, "<"
        )

        //GO TO SHADER PAINT

        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: isMobile ? -0.1 : 0,
                y: 5.2,
                z: isMobile ? -1.8 : -1.4,
            }
        )
        tlRef.current.to(
            camera.rotation,
            {
                duration: 2,
                x: 0,
                y: 4 * Math.PI,
                z: 0,

            }, "<"
        )
        tlRef.current.to(
            tabShader1TextRef.current.material,
            {
                opacity: 1,
            }, "<40%"
        )
        tlRef.current.to(
            tabShader2TextRef.current.material,
            {
                opacity: 1,
            }, "<"
        )

        //GO TO SHADER CLOUD
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: isMobile ? 3.0 : 2.5,
                y: 4.7,
                z: isMobile ? -1.6 : -1.4,
            }
        )
        tlRef.current.to(
            camera.rotation,
            {
                duration: 2,
                x: 0,
                y: 7 * Math.PI / 2,
                z: 0,

            }, "<"
        )
        tlRef.current.to(
            particlesShaderTextRef.current.material,
            {
                opacity: 1,
            }, "<40%"
        )

        //GO TO VINYL
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: isMobile ? 3.0 : 2.5,
                y: 5.2,
                z: 0,
            }
        )
        tlRef.current.to(
            vinyls1TextRef.current.material,
            {
                opacity: 1,
            }, "<40%"
        )
        tlRef.current.to(
            vinyls2TextRef.current.material,
            {
                opacity: 1,
            }, "<"
        )

        //GO TO BOXING BAG
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: isMobile ? 0.25 : 0.3,
                y: 5.2,
                z: isMobile ? -0.2 : -1,
            }
        )
        tlRef.current.to(
            camera.rotation,
            {
                duration: 2,
                x: 0,
                y: 19 * Math.PI / 6,
                z: 0,

            }, "<"
        )
        tlRef.current.to(
            sport1TextRef.current.material,
            {
                opacity: 1,
            }, "<40%"
        )
        tlRef.current.to(
            sport2TextRef.current.material,
            {
                opacity: 1,
            }, "<"
        )

        //GO TO FOOTBALL BALL
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: -0.7,
                y: 4.5,
                z: 0.2,
            }
        )
        tlRef.current.to(
            camera.rotation,
            {
                duration: 2,
                x: 0,
                y: 3 * Math.PI,
                z: 0,

            }, "<"
        )

        //GO TO THE STAIRS
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: -3.2,
                y: 5.1,
                z: 0.2,
            }
        )
        tlRef.current.to(
            camera.rotation,
            {
                duration: 2,
                x: 0,
                y: 2 * Math.PI,
                z: 0,

            }, "<"
        )

        //DOWN THE STAIRS
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: -3.2,
                y: 3.4,
                z: -3.2,
            }
        )
        tlRef.current.to(
            camera.rotation,
            {
                duration: 2,
                x: 0,
                y: 3 * Math.PI / 2,
                z: 0,

            }, "<"
        )

        //GO TO TV
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: 0.6,
                y: 2.4,
                z: -2.1,
            }
        )
        tlRef.current.to(
            camera.rotation,
            {
                duration: 2,
                x: 0,
                y: 2 * Math.PI,
                z: 0,

            }, "<"
        )
        tlRef.current.to(
            seeyouTextRef.current.material,
            {
                opacity: 1,
            }, "<40%"
        )

        //ZOOM ON TV SCREEN
        tlRef.current.to(
            camera.position,
            {
                duration: 2,
                x: 0.6,
                y: 2.35,
                z: isMobile ? -3.2 : -2.8,
            }
        )

        tlRef.current.to(
            { value: 1 },
            {
                duration: 2,
                value: 10,
                onUpdate: function () {
                    setProgress(this.targets()[0].value);
                },
            },
            "<"
        )
        tlRef.current.to(
            { value: -1 },
            {
                value: 1,
                onUpdate: function () {
                    setOpacity(this.targets()[0].value);
                },
            },
            "<60%"
        );
    }, [])

    return <>
        <group
            ref={doorRef}
            position={[3.976, 1.618, -1.95]}
        >
            <mesh
                geometry={props.nodes.DoorMerge.geometry}
            >
                <meshBasicMaterial map={DoorTexture} map-flipY={false} />
            </mesh>
        </group>

        <TvScreen progress={progress} opacity={opacity} />

        <Text
            ref={reactTextRef}
            font="./fonts/Bangers.ttf"
            position={[2.2, 2.85, 1]}
            fontSize={autoSize(t(config, 'quality_1', 'BEAUTIFUL'), 0.1, 8)}
            rotation-y={Math.PI}
            color="#e6e6e6"
            maxWidth={0.6}
            material-transparent={true}
        >
            {t(config, 'quality_1', 'BEAUTIFUL')}
        </Text>

        <Text
            ref={threejsTextRef}
            font="./fonts/Bangers.ttf"
            position={[2.8, 3.45, 3.3]}
            fontSize={autoSize(t(config, 'quality_2', 'SMART'), 0.1, 8)}
            rotation-y={Math.PI}
            color="#e6e6e6"
            maxWidth={0.6}
            material-transparent={true}
        >
            {t(config, 'quality_2', 'SMART')}
        </Text>

        <Text
            ref={symfonyTextRef}
            font="./fonts/Bangers.ttf"
            position={[3.5, 3.85, 3.3]}
            fontSize={autoSize(t(config, 'quality_3', 'FUNNY'), 0.1, 8)}
            rotation-y={Math.PI}
            color="#e6e6e6"
            maxWidth={0.6}
            material-transparent={true}
        >
            {t(config, 'quality_3', 'FUNNY')}
        </Text>

        <Text
            ref={blenderTextRef}
            font="./fonts/Bangers.ttf"
            position={[1.5, 2.85, 2.7]}
            fontSize={autoSize(t(config, 'quality_4', 'SWEET'), 0.1, 8)}
            rotation-y={3 * Math.PI / 4}
            color="#e6e6e6"
            maxWidth={0.6}
            material-transparent={true}
        >
            {t(config, 'quality_4', 'SWEET')}
        </Text>

        <Text
            ref={pythonTextRef}
            font="./fonts/Bangers.ttf"
            position={[-1.6, 3.2, 0.1]}
            fontSize={autoSize(t(config, 'quality_5', 'KIND'), 0.1, 8)}
            rotation-y={Math.PI / 6}
            color="#e6e6e6"
            maxWidth={0.6}
            material-transparent={true}
        >
            {t(config, 'quality_5', 'KIND')}
        </Text>

        <Text
            ref={htmlTextRef}
            font="./fonts/Bangers.ttf"
            position={[-3.7, 2.75, 0.5]}
            fontSize={autoSize(t(config, 'quality_6', 'CARING'), 0.1, 8)}
            rotation-y={Math.PI / 2}
            color="#e6e6e6"
            maxWidth={0.6}
            material-transparent={true}
        >
            {t(config, 'quality_6', 'CARING')}
        </Text>

        <Text
            ref={cssTextRef}
            font="./fonts/Bangers.ttf"
            position={[-3.7, 2.75, 2.15]}
            fontSize={autoSize(t(config, 'quality_7', 'CUTE'), 0.1, 8)}
            rotation-y={Math.PI / 2}
            color="#e6e6e6"
            maxWidth={0.6}
            material-transparent={true}
        >
            {t(config, 'quality_7', 'CUTE')}
        </Text>

        <Text
            ref={javascriptTextRef}
            font="./fonts/Bangers.ttf"
            position={[-2.9, 2.75, 3.4]}
            fontSize={autoSize(t(config, 'quality_8', 'AMAZING'), 0.1, 8)}
            rotation-y={2 * Math.PI / 3}
            color="#e6e6e6"
            maxWidth={0.6}
            material-transparent={true}
        >
            {t(config, 'quality_8', 'AMAZING')}
        </Text>

        <group >
            <Text
                ref={threejsCertificationTextRef1}
                font="./fonts/Bangers.ttf"
                position={[-0.5, 3.1, isMobile ? -1.3 : -1.4]}
                fontSize={autoSize(t(config, 'main_title', 'HAPPY BIRTHDAY'), 0.1, 14)}
                rotation-y={Math.PI / 2}
                color="#e6e6e6"
                maxWidth={0.8}
                material-transparent={true}
            >
                {t(config, 'main_title', 'HAPPY BIRTHDAY')}
            </Text>
            <Text
                ref={threejsCertificationTextRef2}
                font="./fonts/Bangers.ttf"
                position={[-0.5, 3.05, isMobile ? -1.3 : -1.7]}
                fontSize={0.02}
                rotation-y={Math.PI / 2}
                color="#e6e6e6"
                maxWidth={0.5}
                material-transparent={true}
            >
                {t(config, 'main_title_sub', 'MY LOVE')}
            </Text>
        </group>

        <group>
            <Text
                ref={dut1TextRef}
                font="./fonts/Bangers.ttf"
                position={[-1.3, 3.15, isMobile ? -3.1 : -2.9]}
                fontSize={0.07}
                rotation-y={Math.PI / 2}
                color="#e6e6e6"
                maxWidth={0.5}
                material-side={FrontSide}
                material-transparent={true}
            >
                {t(config, 'diploma_text', 'To the most amazing person')}
            </Text>
            <Text
                ref={dut2TextRef}
                font="./fonts/Bangers.ttf"
                position={[-1.3, 2.9, isMobile ? -3.1 : -2.71]}
                fontSize={0.04}
                rotation-y={Math.PI / 2}
                color="#e6e6e6"
                material-side={FrontSide}
                material-transparent={true}
            >
                {t(config, 'diploma_sub1', '(I love you)')}
            </Text>

            <Text
                ref={dut3TextRef}
                font="./fonts/Bangers.ttf"
                position={[-1.3, 2.9, isMobile ? -3.1 : -3]}
                fontSize={0.04}
                rotation-y={Math.PI / 2}
                color="#e6e6e6"
                material-side={FrontSide}
                material-transparent={true}
            >
                {t(config, 'diploma_sub2', 'Forever and ever')}
            </Text>
        </group>

        <group>
            <Text
                ref={licence1TextRef}
                font="./fonts/Bangers.ttf"
                position={[-2.4, 3.5, isMobile ? -3.3 : -3.5]}
                fontSize={0.07}
                rotation-y={Math.PI / 2}
                color="#e6e6e6"
                maxWidth={0.5}
                material-side={FrontSide}
                material-transparent={true}
            >
                {t(config, 'license_text', 'Every day with you is a blessing')}
            </Text>
            <Text
                ref={licence2TextRef}
                font="./fonts/Bangers.ttf"
                position={[-2.4, 3.25, -3.3]}
                fontSize={0.04}
                rotation-y={Math.PI / 2}
                color="#e6e6e6"
                material-side={FrontSide}
                material-transparent={true}
            >
                {t(config, 'license_sub1', '(My favorite person)')}
            </Text>

            <Text
                ref={licence3TextRef}
                font="./fonts/Bangers.ttf"
                position={[-2.4, 3.25, isMobile ? -3.3 : -3.55]}
                fontSize={0.04}
                rotation-y={Math.PI / 2}
                color="#e6e6e6"
                material-side={FrontSide}
                material-transparent={true}
            >
                {t(config, 'license_sub2', 'You mean the world to me')}
            </Text>
        </group>

        <group>
            <Text
                ref={master1TextRef}
                font="./fonts/Bangers.ttf"
                position={[-3.6, 4, -3.2]}
                fontSize={autoSize(t(config, 'birthday_wish', 'Wishing my shaylaaa the best birthday'), 0.06, 25)}
                rotation-y={Math.PI / 2}
                color="#e6e6e6"
                maxWidth={0.85}
                material-side={FrontSide}
                material-transparent={true}
            >
                {t(config, 'birthday_wish', 'Wishing my shaylaaa the best birthday')}
            </Text>
            <Text
                ref={master2TextRef}
                font="./fonts/Bangers.ttf"
                position={[-3.6, 3.82, isMobile ? -3.2 : -2.85]}
                fontSize={0.04}
                rotation-y={Math.PI / 2}
                color="#e6e6e6"
                material-side={FrontSide}
                material-transparent={true}
            >
                {t(config, 'birthday_wish_sub1', '(Happy Birthday!)')}
            </Text>

            <Text
                ref={master3TextRef}
                font="./fonts/Bangers.ttf"
                position={[-3.6, 3.65, isMobile ? -3.2 : -3.45]}
                fontSize={0.04}
                rotation-y={Math.PI / 2}
                color="#e6e6e6"
                material-side={FrontSide}
                material-transparent={true}
            >
                {t(config, 'birthday_wish_sub2', 'I hope all your wishes come true')}
            </Text>
        </group>

        <group>
            <Text
                ref={tabShader1TextRef}
                font="./fonts/Bangers.ttf"
                position={[-0.3, 5.4, -2.1]}
                fontSize={0.07}
                color="#e6e6e6"
                maxWidth={1}
                material-transparent={true}
            >
                {t(config, 'smile_text', 'Your smile...')}
            </Text>

            <Text
                ref={tabShader2TextRef}
                font="./fonts/Bangers.ttf"
                position={[0, 5.38, -2.1]}
                fontSize={0.02}
                color="#e6e6e6"
                maxWidth={1}
                material-transparent={true}
            >
                {t(config, 'smile_sub', 'is hypnotizing')}
            </Text>

        </group>

        <Text
            ref={particlesShaderTextRef}
            font="./fonts/Bangers.ttf"
            position={[3.3, 4.8, -1.8]}
            fontSize={0.07}
            rotation-y={3 * Math.PI / 2}
            color="#e6e6e6"
            maxWidth={1}
            material-transparent={true}
        >
            {t(config, 'everything_text', 'You are my everything')}
        </Text>

        <group>
            <Text
                ref={vinyls1TextRef}
                font="./fonts/Bangers.ttf"
                position={[3.3, 5.2, 0]}
                fontSize={0.07}
                rotation-y={3 * Math.PI / 2}
                color="#e6e6e6"
                maxWidth={1}
                material-transparent={true}
            >
                {t(config, 'love_text', 'I love us...')}
            </Text>

            <Text
                ref={vinyls2TextRef}
                font="./fonts/Bangers.ttf"
                position={[3.3, 5.15, -0.]}
                fontSize={0.02}
                rotation-y={3 * Math.PI / 2}
                color="#e6e6e6"
                maxWidth={1}
                material-transparent={true}
            >
                {t(config, 'love_sub', 'and our memories')}
            </Text>
        </group>

        <group>
            <Text
                ref={sport1TextRef}
                font="./fonts/Bangers.ttf"
                position={[0.2, 5, 0.7]}
                fontSize={0.07}
                rotation-y={7 * Math.PI / 6}
                color="#e6e6e6"
                maxWidth={1}
                material-transparent={true}
            >
                {t(config, 'heart_text', 'You have my heart...')}
            </Text>
            <Text
                ref={sport2TextRef}
                font="./fonts/Bangers.ttf"
                position={[0.2, 4.95, 0.7]}
                fontSize={0.02}
                rotation-y={7 * Math.PI / 6}
                color="#e6e6e6"
                maxWidth={1}
                material-transparent={true}
            >
                {t(config, 'heart_subtext', 'now and forever')}
            </Text>
        </group>

        <Text
            ref={seeyouTextRef}
            font="./fonts/Bangers.ttf"
            position={[0, 2.7, -3.7]}
            fontSize={autoSize(t(config, 'final_text', 'Happy Birthday Shaylaaa !'), 0.2, 25)}
            color="#e6e6e6"
            maxWidth={1}
            material-transparent={true}
        >
            {t(config, 'final_text', 'Happy Birthday Shaylaaa !')}
        </Text>

    </>


}
