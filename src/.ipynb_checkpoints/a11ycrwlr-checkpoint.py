import json
import os
from pathlib import Path
import pandas as pd


root_dir = Path.cwd().parent
data_dir = os.path.join(root_dir, "playwright/axeResults")

files_list = os.listdir(data_dir)

df = pd.read_json(os.path.join(data_dir, files_list[8]))

print(df.head())
# for filename in files_list:
#     file_path = os.path.join(data_dir, filename)
#
