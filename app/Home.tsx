import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Video, Audio } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

const HeroDetail = () => {
    const heroDetail = {
        id: 0,
        name: "npc_dota_hero_antimage",
        localized_name: "Anti-Mage",
        primary_attr: "Agility",
        attack_type: "Melee",
    };

    const antiMageImage = require('./image/anti.jpg');

    return (
        <View style={styles.heroDetailContainer}>
            <Image source={antiMageImage} style={styles.heroImage} />
            <Text style={styles.heroName}>{heroDetail.localized_name}</Text>
            <Text style={styles.heroAttribute}>Primary Attribute: {heroDetail.primary_attr}</Text>
            <Text style={styles.heroAttackType}>Attack Type: {heroDetail.attack_type}</Text>
        </View>
    );
};

const HeroStats = () => {
    const heroStats = {
        id: 1,
        name: "npc_dota_hero_antimage",
        localized_name: "Anti-Mage",
        primary_attr: "Agility",
        attack_type: "Melee",
        roles: ["Carry", "Escape"],
        base_health: 2000,
        base_health_regen: 2.5,
        base_mana: 1000,
        base_mana_regen: 1.5,
        base_armor: 5,
        base_mr: 25,
        base_attack_min: 29,
        base_attack_max: 33,
        base_str: 23,
        base_agi: 24,
        base_int: 12,
        str_gain: 1.3,
        agi_gain: 3.2,
        int_gain: 1.8,
        attack_range: 150,
        projectile_speed: 0,
        attack_rate: 1.4,
        base_attack_time: 1.45,
        attack_point: 0.3,
        move_speed: 310,
        turn_rate: 0.5,
        cm_enabled: true,
        legs: 2,
        hero_id: 1,
    };
    const antiMageImage = require('./image/anti.jpg');
    return (
        <View style={styles.heroDetailContainer}>
            <Image source={antiMageImage} style={styles.heroImage} />
            <Text style={styles.heroName}>{heroStats.localized_name} Stats</Text>
            <Text style={styles.heroAttribute}>Primary Attribute: {heroStats.primary_attr}</Text>
            <Text style={styles.heroAttackType}>Attack Type: {heroStats.attack_type}</Text>
            <Text style={styles.heroRoles}>Roles: {heroStats.roles.join(", ")}</Text>
            <Text style={styles.heroBaseHealth}>Base Health: {heroStats.base_health}</Text>
            <Text style={styles.heroHealthRegen}>Base Health Regen: {heroStats.base_health_regen}</Text>
            <Text style={styles.heroBaseMana}>Base Mana: {heroStats.base_mana}</Text>
            <Text style={styles.heroManaRegen}>Base Mana Regen: {heroStats.base_mana_regen}</Text>
            <Text style={styles.heroBaseArmor}>Base Armor: {heroStats.base_armor}</Text>
            <Text style={styles.heroMagicResistance}>Base Magic Resistance: {heroStats.base_mr}%</Text>
            <Text style={styles.heroAttackDamage}>Base Attack Damage: {heroStats.base_attack_min} - {heroStats.base_attack_max}</Text>
            <Text style={styles.heroStrength}>Base Strength: {heroStats.base_str}</Text>
            <Text style={styles.heroAgility}>Base Agility: {heroStats.base_agi}</Text>
            <Text style={styles.heroIntelligence}>Base Intelligence: {heroStats.base_int}</Text>
            <Text style={styles.heroAttackRange}>Attack Range: {heroStats.attack_range}</Text>
            <Text style={styles.heroProjectileSpeed}>Projectile Speed: {heroStats.projectile_speed}</Text>
            <Text style={styles.heroAttackRate}>Attack Rate: {heroStats.attack_rate}</Text>
            <Text style={styles.heroBaseAttackTime}>Base Attack Time: {heroStats.base_attack_time}</Text>
            <Text style={styles.heroAttackPoint}>Attack Point: {heroStats.attack_point}</Text>
            <Text style={styles.heroMovementSpeed}>Movement Speed: {heroStats.move_speed}</Text>
            <Text style={styles.heroTurnRate}>Turn Rate: {heroStats.turn_rate}</Text>
            <Text style={styles.heroLegs}>Legs: {heroStats.legs}</Text>
        </View>
    );
};

const App = () => {
    const [showStats, setShowStats] = useState(false);
    const [showHeroDetail, setShowHeroDetail] = useState(true);
    const [videoFinished, setVideoFinished] = useState(false);
    const videoRef = useRef<Video>(null); // Ref for the video component
    const clickSoundRef = useRef(null); // Ref for the click sound

    // Load the click sound when the component mounts
    useEffect(() => {
        const loadSound = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('./image/sf.mp3')
            );
            clickSoundRef.current = sound;
        };
        loadSound();
        return () => {
            if (clickSoundRef.current) {
                clickSoundRef.current.unloadAsync();
            }
        };
    }, []);

    // Function to play the click sound
    const playClickSound = async () => {
        try {
            await clickSoundRef.current.replayAsync();
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    };

    const handleVideoFinish = async () => {
        setVideoFinished(true);
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };

    useEffect(() => {
        const playVideoAsync = async () => {
            try {
                if (videoRef.current) {
                    await videoRef.current.playAsync(); // Play the video
                }
            } catch (error) {
                console.error("Error playing video:", error);
            }
        };
        playVideoAsync();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <ImageBackground source={require('./image/bg2.jpg')} style={styles.background}>
                {!videoFinished && (
                    <Video
                        screenOptions={{ headerShown: false }}
                        ref={videoRef}
                        source={require('./image/intro.mp4')}
                        style={styles.backgroundVideo}
                        shouldPlay
                        isLooping={false}
                        resizeMode="cover"
                        onPlaybackStatusUpdate={(status) => {
                            if (status.didJustFinish) {
                                handleVideoFinish();
                            }
                        }}
                        onError={(error) => console.error("Error loading video:", error)}
                    />
                )}
                {videoFinished && (
                    <View style={styles.container1}>
                        <View style={styles.innerContainer}>
                            {showHeroDetail && <HeroDetail />}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    playClickSound(); // Play the click sound
                                    setShowStats(!showStats);
                                    setShowHeroDetail(!showHeroDetail);
                                }}
                            >
                                <Text style={styles.buttonText}>{showStats ? 'Hide Stats' : 'Show Stats'}</Text>
                            </TouchableOpacity>
                            {showStats && <HeroStats />}
                        </View>
                    </View>
                )}
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%',
        
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20, 
        width: '100%',
    },
    container1: {
        flex: 1,
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        width: '100%',
        height: 'auto',
        marginTop: -70,
    },
    innerContainer: {
        marginBottom: 40,
        width: '80%',
        maxWidth: 300,
        marginTop: 50,
        backgroundColor: 'rgba(240, 248, 255, 0.8)',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    button: {
        height: 40,
        width: '100%',
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    heroDetailContainer: {
        marginTop: 10,
    },
    heroName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    heroAttribute: {
        fontSize: 16,
    },
    heroAttackType: {
        fontSize: 16,
    },
    heroRoles: {
        fontSize: 16,
    },
    heroBaseHealth: {
        fontSize: 16,
    },
    heroHealthRegen: {
        fontSize: 16,
    },
    heroBaseMana: {
        fontSize: 16,
    },
    heroManaRegen: {
        fontSize: 16,
    },
    heroBaseArmor: {
        fontSize: 16,
    },
    heroMagicResistance: {
        fontSize: 16,
    },
    heroAttackDamage: {
        fontSize: 16,
    },
    heroStrength: {
        fontSize: 16,
    },
    heroAgility: {
        fontSize: 16,
    },
    heroIntelligence: {
        fontSize: 16,
    },
    heroAttackRange: {
        fontSize: 16,
    },
    heroProjectileSpeed: {
        fontSize: 16,
    },
    heroAttackRate: {
        fontSize: 16,
    },
    heroBaseAttackTime: {
        fontSize: 16,
    },
    heroAttackPoint: {
        fontSize: 16,
    },
    heroMovementSpeed: {
        fontSize: 16,
    },
    heroTurnRate: {
        fontSize: 16,
    },
    heroLegs: {
        fontSize: 16,
    },
    heroImage: {
        width: 150,
        height: 150,
        marginRight: 10,
    },
});

export default App;
