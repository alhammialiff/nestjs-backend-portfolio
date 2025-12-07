export interface MqttResponse {
    ok: boolean;
    topic: string;
    payload: any;
    qos: number;
}