import json
import os
from pathlib import Path
import time
import pika
import socket
import uuid
from dotenv import load_dotenv


load_dotenv()

# Instantiate ID
WORKER_ID = os.getenv("WORKER_ID") or f"{socket.gethostname()}-{os.getpid()}-{uuid.uuid4().hex[:8]}"

rabbitmq_url = os.getenv(
    "RABBITMQ_URL",
    "amqp://guest:guest@localhost:5672/%2F"
)

queue_name = os.getenv(
    "RABBITMQ_QUEUE",
    "job_queue"
)

params = pika.URLParameters(rabbitmq_url)
connection = pika.BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue=queue_name, durable=True)
channel.basic_qos(prefetch_count=1)

def callback(ch, method, properties, body):

    try:
        payload = json.loads(body.decode("utf-8"))
        data = payload.get("data")
    except Exception:
        data = body.decode("utf-8")

    print(f"Processing job: {data}")

    ### Long process is here ###
    # ML Fit can be placed here
    time.sleep(5)

    print(f"Done job: {data}")

    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=False)

print(f"[{WORKER_ID}] Listening on queue={queue_name}...")
channel.start_consuming()