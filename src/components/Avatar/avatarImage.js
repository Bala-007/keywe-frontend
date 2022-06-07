import React, { useState, useEffect } from "react";

function AvatarImage(props) {

    const [color, SetColor] = useState('');
    const [name, SetName] = useState('');

    const Name = props.data;

    console.log(Name)

    useEffect(async () => {
        avatar(props.data);
        avatarName(props.data);

    }, [props])
    const getHashOfString = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        hash = Math.abs(hash);
        return hash;
    };

    const normalizeHash = (hash, min, max) => {
        return Math.floor((hash % (max - min)) + min);
    };


    const hRange = [0, 360];
    const sRange = [0, 100];
    const lRange = [0, 100];

    const generateHSL = (name) => {
        const hash = getHashOfString(name);
        const h = normalizeHash(hash, hRange[0], hRange[1]);
        const s = normalizeHash(hash, sRange[0], sRange[1]);
        const l = normalizeHash(hash, lRange[0], lRange[1]);
        return [h, s, l];
    };

    const HSLtoString = (hsl) => {
        return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
    };

    const avatar = (name) => {
        let genHSL = generateHSL(name);
        let HSLString = HSLtoString(genHSL);
        SetColor(HSLString)
    }

    const avatarName = (user) => {
        let name = user.includes(" ") ? user.split(" ") : [user]
        SetName(`${name[0][0]}${name[1] ? name[1][0] : ""}`.toUpperCase())
    }

    return (
        <div className="avatarColor" style={{ backgroundColor: color }}>
            <p className="profilename color-white" style={{fontSize:props.fontSize}}>{name}</p>
        </div>
    )
}

export default AvatarImage
