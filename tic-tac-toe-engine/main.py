from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import os
from engine import Environment, AgentEval

LENGTH = 3  # Board Length, currently supports only 3

app = FastAPI()

class GameState(BaseModel):
    board: list[list[int]]
    current_player: str


@app.post("/make_move")
async def make_move(game_state: GameState):
    env = Environment()
    if env.ended:
        raise HTTPException(status_code=400, detail="Game already ended. Please reset the game.")

    try:
        env.set_state(game_state.board)
    except HTTPException as e:
        raise e

    current_player = game_state.current_player
    if current_player not in ['x', 'o']:
        raise HTTPException(status_code=400, detail="Invalid player. Use 'x' or 'o'.")

    # Load value functions from files (provide correct path here)
    sv_path = ''  # specify your path
    if not os.path.exists(os.path.join(sv_path, 'vx.npy')) or not os.path.exists(os.path.join(sv_path, 'vo.npy')):
        raise HTTPException(status_code=400, detail="Value function files not found. Please provide the correct path.")

    vx_val = np.load(os.path.join(sv_path, 'vx.npy'))
    vo_val = np.load(os.path.join(sv_path, 'vo.npy'))

    x_agent = AgentEval(env.x, vx_val)
    o_agent = AgentEval(env.o, vo_val)

    if current_player == 'x':
        next_move = x_agent.take_action(env)
    else:
        next_move = o_agent.take_action(env)

    return {"next_move": next_move, "board": env.board.tolist()}



@app.post("/check_game_state")
async def check_game_state(game_state: GameState):
    env = Environment()
    try:
        env.set_state(game_state.board)
    except ValueError as e:
        # Check if the game has already ended and return the correct result
        if env.ended:
            if env.winner == env.x:
                return {"status": "x wins"}
            elif env.winner == env.o:
                return {"status": "o wins"}
            else:
                return {"status": "draw"}
        raise HTTPException(status_code=400, detail=str(e))

    if env.ended:
        if env.winner == env.x:
            return {"status": "x wins"}
        elif env.winner == env.o:
            return {"status": "o wins"}
        else:
            return {"status": "draw"}
    else:
        return {"status": "ongoing"}