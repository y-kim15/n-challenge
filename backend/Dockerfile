FROM continuumio/miniconda3

RUN mkdir /app
WORKDIR /app

# Create the environment:
COPY environment.yml .
RUN conda env create -f environment.yml

# Make RUN commands use `bash --login`:
SHELL ["conda", "run", "-n", "nate-env", "/bin/bash", "-c"]

COPY . .
