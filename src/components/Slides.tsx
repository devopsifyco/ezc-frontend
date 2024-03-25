import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';


const slideData = [
    { id: 1, imageUrl: require('../assets/slides.jpg'), title: 'Slide 1' },
    { id: 2, imageUrl: require('../assets/home/back-ground-slider.png'), title: 'Slide 2' },
    //{ id: 3, imageUrl: require('../assets/home/back-ground-slider-3.png'), title: 'Slide 3' },
    //{ id: 3, imageUrl: require('../assets/home/back-round-animate-1.png'), title: 'Slide 4' },
];



export default function Slides() {

    const swiperRef = useRef<Swiper>(null);

    const renderPrevButton = () => (
        <TouchableOpacity style={styles.button} onPress={() => swiperRef.current?.scrollBy(-1)}>
            <Image source={require('../assets/icons/prev.png')} />
        </TouchableOpacity>
    );

    const renderNextButton = () => (
        <TouchableOpacity style={styles.button} onPress={() => swiperRef.current?.scrollBy(1)}>
            <Image source={require('../assets/icons/next.png')} />
        </TouchableOpacity>
    );

    return (
        <>
            <Swiper
                ref={swiperRef}
                style={styles.wrapper}
                showsButtons={true}
                autoplay
                prevButton={renderPrevButton()}
                nextButton={renderNextButton()}
                showsPagination={false}
                removeClippedSubviews={false}
            >
                {slideData.map((item) => (
                    <View
                        key={item.id}
                        style={styles.slide}
                    >
                        <Image
                            style={{ height: 150, width: '100%' }}
                            source={item.imageUrl}
                            resizeMode='cover'
                        />
                    </View>
                ))}
            </Swiper>

        </>
    )
}


export const styles = StyleSheet.create({
    wrapper: {
        height: 170,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    },
    button: {
        paddingVertical: 10,
    }
})