enum onoff {
    ON,
    OFF,
}
enum whiteblack {
    黒,
    白,
}

enum sence_select {
    普通,
    高感度,
    低感度,
}

enum direction {
    前,
    後,
    右,
    左,
    右前,
    左前,
    止まる,
    しっかり止ま
}

enum lotation {
    左,
    右,
}
enum car_LED_onoff {
    無効,
    有効,
}

enum kyori {
    短い,
    長い,
}
enum sonar_avg {
    低速高精度,
    中速中精度,
    高速低精度,
}

enum light_sensor {
    暗い,
    明るい,
}


let con_le = 0;
let con_op = 0;


//% color="#3943c6" block="ﾕｰﾚｶ･ｶｰVer1.4" icon="\uf1b9"

namespace eureka_blocks_car {
    /*
      //% color="#ff3d03" weight=59 blockId=eurekacar_buz_set block="ﾕｰﾚｶ車で音をならす" group="1_初期設定"
      export function eurekacar_buz_set() {
        pins.analogSetPitchPin(AnalogPin.P0);
      }
    */

    //% color="#ffa800" weight=99　blockId=servos_condition
    //% block="左右バランス調整 左へ |%le| 右へ" group="1　調整"
    //% le.min=-100 le.max=100
    export function condition(le: number): void {
        con_le = le;
    }

    //% color="#ffa800" weight=97　blockId=servos_op
    //% block="スピード調整 |%op|" group="1　調整"
    //% op.min=-95 op.max=0
    export function servo_op(op: number): void {
        con_op = op;
    }




    //% color="#3943c6" weight=71　blockId=servos_direction
    //% block="進行方向 |%sinkou_houkou| " group="2　基本の動き"
    export function car_derection(sinkou_houkou: direction): void {
        switch (sinkou_houkou) {
            case direction.前:
                if (con_le >= 0) {
                    pins.servoWritePin(AnalogPin.P14, 90 - (90 * (con_op + 100)) / 100 + con_le);
                    pins.servoWritePin(AnalogPin.P13, 90 + (90 * (con_op + 100)) / 100);
                }
                if (con_le < 0) {
                    pins.servoWritePin(AnalogPin.P14, 90 - (90 * (con_op + 100)) / 100);
                    pins.servoWritePin(AnalogPin.P13, 90 + (90 * (con_op + 100)) / 100 + con_le);
                }
                break;
            case direction.後:
                if (con_le >= 0) {
                    pins.servoWritePin(AnalogPin.P14, 90 + (90 * (con_op + 100)) / 100 - con_le);
                    pins.servoWritePin(AnalogPin.P13, 90 - (90 * (con_op + 100)) / 100);
                }
                if (con_le < 0) {
                    pins.servoWritePin(AnalogPin.P14, 90 + (90 * (con_op + 100)) / 100);
                    pins.servoWritePin(AnalogPin.P13, 90 - (90 * (con_op + 100)) / 100 - con_le);
                }
                break;
            case direction.左:
                pins.servoWritePin(AnalogPin.P14, 90 - (90 * (con_op + 100)) / 100);
                pins.servoWritePin(AnalogPin.P13, 90);
                break;
            case direction.右:
                pins.servoWritePin(AnalogPin.P14, 90);
                pins.servoWritePin(AnalogPin.P13, 90 + (90 * (con_op + 100)) / 100);
                break;
            case direction.左前:
                pins.servoWritePin(AnalogPin.P14, 60);
                pins.servoWritePin(AnalogPin.P13, 100);
                break;
            case direction.右前:
                pins.servoWritePin(AnalogPin.P14, 80);
                pins.servoWritePin(AnalogPin.P13, 120);
                break;
            case direction.止まる:
                pins.digitalWritePin(DigitalPin.P13, 0)
                pins.digitalWritePin(DigitalPin.P14, 0)
                break;
        }
    }




    //% color="#3943c6" weight=70　blockId=servos_direction
    //% block="進行方向 |%sinkou_houkou| 動作時間|%time_sec| 秒" group="2　基本の動き"
    export function car_derection_time(sinkou_houkou: direction, time_sec: number): void {
        switch (sinkou_houkou) {
            case direction.前:
                if (con_le >= 0) {
                    pins.servoWritePin(AnalogPin.P14, 90 - (90 * (con_op + 100)) / 100 + con_le);
                    pins.servoWritePin(AnalogPin.P13, 90 + (90 * (con_op + 100)) / 100);
                }
                if (con_le < 0) {
                    pins.servoWritePin(AnalogPin.P14, 90 - (90 * (con_op + 100)) / 100);
                    pins.servoWritePin(AnalogPin.P13, 90 + (90 * (con_op + 100)) / 100 + con_le);
                }
                basic.pause(time_sec * 1000);
                pins.servoWritePin(AnalogPin.P13, 90);
                pins.servoWritePin(AnalogPin.P14, 90);
                break;
            case direction.後:
                if (con_le >= 0) {
                    pins.servoWritePin(AnalogPin.P14, 90 + (90 * (con_op + 100)) / 100 - con_le);
                    pins.servoWritePin(AnalogPin.P13, 90 - (90 * (con_op + 100)) / 100);
                }
                if (con_le < 0) {
                    pins.servoWritePin(AnalogPin.P14, 90 + (90 * (con_op + 100)) / 100);
                    pins.servoWritePin(AnalogPin.P13, 90 - (90 * (con_op + 100)) / 100 - con_le);
                }
                basic.pause(time_sec * 1000);
                pins.servoWritePin(AnalogPin.P13, 90);
                pins.servoWritePin(AnalogPin.P14, 90);
                break;
            case direction.左:
                pins.servoWritePin(AnalogPin.P14, 90 - (90 * (con_op + 100)) / 100);
                pins.servoWritePin(AnalogPin.P13, 90);
                basic.pause(time_sec * 1000);
                pins.servoWritePin(AnalogPin.P13, 90);
                pins.servoWritePin(AnalogPin.P14, 90);
                break;
            case direction.右:
                pins.servoWritePin(AnalogPin.P14, 90);
                pins.servoWritePin(AnalogPin.P13, 90 + (90 * (con_op + 100)) / 100);
                basic.pause(time_sec * 1000);
                pins.servoWritePin(AnalogPin.P13, 90);
                pins.servoWritePin(AnalogPin.P14, 90);
                break;
            case direction.左前:
                pins.servoWritePin(AnalogPin.P14, 60);
                pins.servoWritePin(AnalogPin.P13, 100);
                basic.pause(time_sec * 1000);
                pins.servoWritePin(AnalogPin.P13, 90);
                pins.servoWritePin(AnalogPin.P14, 90);
                break;
            case direction.右前:
                pins.servoWritePin(AnalogPin.P14, 80);
                pins.servoWritePin(AnalogPin.P13, 120);
                basic.pause(time_sec * 1000);
                pins.servoWritePin(AnalogPin.P13, 90);
                pins.servoWritePin(AnalogPin.P14, 90);
                break;
            case direction.止まる:
                pins.digitalWritePin(DigitalPin.P13, 0)
                pins.digitalWritePin(DigitalPin.P14, 0)
                break;
        }
    }



    //% color="#3943c6" weight=63blockId=servos_lotation
    //% block="回転 |%lot_houkou| " group="2　基本の動き"
    export function car_lotation(lot_houkou: lotation): void {
        switch (lot_houkou) {
            case lotation.左:
                pins.servoWritePin(AnalogPin.P14, 90 - (90 * (con_op + 100)) / 100);
                pins.servoWritePin(AnalogPin.P13, 90 - (90 * (con_op + 100)) / 100);
                break;
            case lotation.右:
                pins.servoWritePin(AnalogPin.P14, 90 + (90 * (con_op + 100)) / 100);
                pins.servoWritePin(AnalogPin.P13, 90 + (90 * (con_op + 100)) / 100);
                break;
        }

    }






    //% color="#3943c6" weight=59　blockId=servo_pro_bal
    //% block="前進方向オリジナル 左へ |%set_lr| 右へ" group="2　基本の動き"
    //% set_lr.min=-90 set_lr.max=90
    export function pro_bal(set_lr: number): void {
        pins.servoWritePin(AnalogPin.P14, 90 - (90 * (con_op + 100)) / 100);
        pins.servoWritePin(AnalogPin.P13, 90 + (90 * (con_op + 100)) / 100);
    }

    //% color="#3943c6" weight=58　blockId=servo_pro_LR
    //% block="|%lot_houkou| 車輪 出力 |%set_LR| " group="2　基本の動き"
    //% set_LR.min=-100 set_LR.max=100
    export function pro_LR(lot_houkou: lotation, set_LR: number): void {
        switch (lot_houkou) {
            case lotation.左:
                pins.servoWritePin(AnalogPin.P13, 90 + (90 * set_LR) / 100);

                break;
            case lotation.右:
                pins.servoWritePin(AnalogPin.P14, 90 - (90 * set_LR) / 100);
                break;
        }
    }

    //% color="#1E90FF" weight=51 blockId=wait_time1
    //% block="待ち時間 |%second| （秒) " group="2　基本の動き"
    export function wait_time1(second: number): void {
        basic.pause(second * 1000);
    }

    //% color="#009A00" weight=22 blockId=sonar_ping_2 block="きょりｾﾝｻ" group="3 超音波きょりｾﾝｻｰ"
    export function sonar_ping_2(): number {
        let d1 = 0;
        let d2 = 0;

        for (let i = 0; i < 2; i++) {
            // send
            basic.pause(5);
            pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
            pins.digitalWritePin(DigitalPin.P8, 0);
            control.waitMicros(2);
            pins.digitalWritePin(DigitalPin.P8, 1);
            control.waitMicros(10);
            pins.digitalWritePin(DigitalPin.P8, 0);
            // read
            d1 = pins.pulseIn(DigitalPin.P16, PulseValue.High, 500 * 58);
            d2 = d2 + d1;
        }
        return Math.round(Math.idiv(d2 / 2, 58) * 1.5);
    }


    //% color="#009A00" weight=21 blockId=sonar_ping_LED block="きょりを表示する" group="3 超音波きょりｾﾝｻｰ"
    export function sonar_ping_LED() {
        basic.showNumber(sonar_ping_2());
    }






    //% color="#009A00" weight=20 block="きょりが |%limit| cmより |%nagasa| " group="3 超音波きょりｾﾝｻｰ"
    //% limit.min=0 limit.max=30
    export function sonar_ping_3(limit: number, nagasa: kyori): boolean {
        let d1 = 0;
        let d2 = 0;

        for (let i = 0; i < 2; i++) {
            // send
            basic.pause(5);
            pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
            pins.digitalWritePin(DigitalPin.P8, 0);
            control.waitMicros(2);
            pins.digitalWritePin(DigitalPin.P8, 1);
            control.waitMicros(10);
            pins.digitalWritePin(DigitalPin.P8, 0);
            // read
            d1 = pins.pulseIn(DigitalPin.P16, PulseValue.High, 500 * 58);
            d2 = d1 + d2;
        }
        switch (nagasa) {
            case kyori.短い:
                if (Math.idiv(d2 / 2, 58) * 1.5 < limit) {
                    return true;
                } else {
                    return false;
                }
                break;
            case kyori.長い:
                if (Math.idiv(d2 / 2, 58) * 1.5 < limit) {
                    return false;
                } else {
                    return true;
                }
                break;
        }
    }


    //% color="#f071bd" weight=30 blockId=auto_photo_R block="右ﾌｫﾄﾘﾌﾚｸﾀｰ" group="4 ﾌｫﾄﾘﾌﾚｸﾀｰ"
    export function phto_R() {
        return Math.round((pins.analogReadPin(AnalogPin.P2) / 1023) * 100);
    }

    //% color="#f071bd" weight=28 blockId=auto_photo_L block="左ﾌｫﾄﾘﾌﾚｸﾀｰ" group="4 ﾌｫﾄﾘﾌﾚｸﾀｰ"
    export function phto_L() {
        return Math.round((pins.analogReadPin(AnalogPin.P1) / 1023) * 100);
    }

    //% color="#d4b41f"  weight=26 block="右ﾌｫﾄﾘｸﾚｸﾀｰ値 |%limit_R| より小さい" group="4 ﾌｫﾄﾘﾌﾚｸﾀｰ"
    //% limit_R.min=0 limit_R.max=100
    export function photo_R(limit_R: number): boolean {
        if ((pins.analogReadPin(AnalogPin.P2) / 1023) * 100 < limit_R) {
            return true;
        } else {
            return false;
        }
    }

    //% color="#d4b41f"  weight=27 block="左ﾌｫﾄﾘｸﾚｸﾀｰ値 |%limit_L| より小さい" group="4 ﾌｫﾄﾘﾌﾚｸﾀｰ"
    //% limit_L.min=0 limit_L.max=100
    export function photo_L(limit_L: number): boolean {
        if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < limit_L) {
            return true;
        } else {
            return false;
        }
    }

    //% color="#6041f1"  weight=23 block="右だけが |%wb| をふんだ時 しきい値 |%sikii| " group="4　センサー" group="4 ﾌｫﾄﾘﾌﾚｸﾀｰ"
    //% sence.min=10 sence.max=40
    export function photo_R_out(wb: whiteblack, sikii: sence_select): boolean {
        if (sikii == sence_select.低感度) {
            sikii = 30;
        }
        if (sikii == sence_select.普通) {
            sikii = 20;
        }
        if (sikii == sence_select.高感度) {
            sikii = 10;
        }
        switch (wb) {
            case whiteblack.黒:
                if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 > sikii && (pins.analogReadPin(AnalogPin.P2) / 1023) * 100 < sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
            case whiteblack.白:
                if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < sikii && (pins.analogReadPin(AnalogPin.P2) / 1023) * 100 > sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
        }
    }

    //% color="#6041f1"  weight=24 block="左だけが |%wb| をふんだ時 しきい値 |%sikii| " group="4 ﾌｫﾄﾘﾌﾚｸﾀｰ" 
    export function photo_L_out(wb: whiteblack, sikii: sence_select): boolean {
        if (sikii == sence_select.低感度) {
            sikii = 30;
        }
        if (sikii == sence_select.普通) {
            sikii = 20;
        }
        if (sikii == sence_select.高感度) {
            sikii = 10;
        }
        switch (wb) {
            case whiteblack.黒:
                if (

                    (pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < sikii && (pins.analogReadPin(AnalogPin.P2) / 1023) * 100 > sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
            case whiteblack.白:
                if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 > sikii && (pins.analogReadPin(AnalogPin.P2) / 1023) * 100 < sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
        }
    }
    //% color="#6041f1"  weight=25 block="左右とも |%wb| をふんでいる時 しきい値 |%sikii| " group="4 ﾌｫﾄﾘﾌﾚｸﾀｰ"
    export function photo_LR_out(wb: whiteblack, sikii: sence_select): boolean {
        if (sikii == sence_select.低感度) {
            sikii = 30;
        }
        if (sikii == sence_select.普通) {
            sikii = 20;
        }
        if (sikii == sence_select.高感度) {
            sikii = 10;
        }

        switch (wb) {
            case whiteblack.黒:
                if (
                    (pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < sikii && (pins.analogReadPin(AnalogPin.P2) / 1023) * 100 < sikii) {
                    return true;
                } else {
                    return false;
                }
                break;

            case whiteblack.白:

                if (
                    (pins.analogReadPin(AnalogPin.P1) / 1023) * 100 > sikii && (pins.analogReadPin(AnalogPin.P2) / 1023) * 100 > sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
        }
    }




    //% color="#009A00"  weight=80 blockId=light_limit block="光ｾﾝｻ値が |%limit| より |%l_sel| " group="5 明るさｾﾝｻｰ"
    //% limit.min=0 limit.max=100
    export function light_limit(limit: number, l_sel: light_sensor): boolean {
        switch (l_sel) {
            case light_sensor.暗い:
                led.enable(false);
                if ((pins.analogReadPin(AnalogPin.P4) / 1023) * 100 < limit) {
                    return true;
                } else {
                    return false;
                }
                break;

            case light_sensor.明るい:
                led.enable(false);
                if ((pins.analogReadPin(AnalogPin.P4) / 1023) * 100 >= limit) {
                    return true;
                } else {
                    return false;
                }
                break;
        }
    }

    //% color="#009A00"  weight=81 blockId=eureka_light block="光ｾﾝｻの値を調べる" group="5 明るさｾﾝｻｰ"
    export function eureka_light() {
        led.enable(false);
        let light = Math.round((pins.analogReadPin(AnalogPin.P4) / 1023) * 100);
        led.enable(true);
        basic.showNumber(light);
    }

    //% color="#ff3d03" weight=12 blockId=auto_led_off block="ﾏｲｸﾛﾋﾞｯﾄのLEDを |%Matrix_LED| にする"group="6 ライト"
    export function auto_led_off(Matrix_LED: car_LED_onoff) {
        switch (Matrix_LED) {
            case car_LED_onoff.無効:
                led.enable(false);
                break;
            case car_LED_onoff.有効:
                led.enable(true);
        }
    }
    //% color="#40a6ff" weight=10 blockId=auto_white_LED block="前＿白LED |%mode| " group="6 ライト"
    export function white_LED(mode: onoff) {
        if (mode == onoff.ON) {
            pins.digitalWritePin(DigitalPin.P3, 1);
        } else {
            return pins.digitalWritePin(DigitalPin.P3, 0);
        }
    }

    //% color="#ff4940" weight=8 blockId=auto_red_LED block="後ろ＿赤LED |%mode| " group="6 ライト"
    export function red_LED(mode: onoff) {
        if (mode == onoff.ON) {
            pins.digitalWritePin(DigitalPin.P15, 1);
        } else {
            return pins.digitalWritePin(DigitalPin.P15, 0);
        }
    }
}


