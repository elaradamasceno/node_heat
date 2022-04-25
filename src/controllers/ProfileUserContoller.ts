import { Request, Response } from "express";
import { ProfieUserService } from "../services/ProfileUserService";

class ProfileUserContoller {
  async handle(request: Request, response: Response){
    const { user_id } = request;
    const service = new ProfieUserService();
    const result = await service.execute(user_id);

    return response.json(result)
  }
}

export { ProfileUserContoller }