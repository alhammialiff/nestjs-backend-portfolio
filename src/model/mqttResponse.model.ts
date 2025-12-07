export interface MqttResponse {
    ok: boolean;
    topic: string;
    payload: string | null;
    qos: number | null;
    error?: string | null;
}