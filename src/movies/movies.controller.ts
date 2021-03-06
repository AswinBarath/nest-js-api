import { 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Patch, 
  Post, 
  Body, 
  Query, 
  NotFoundException
} from '@nestjs/common';
import { MoviesService } from './movies.service'
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {

  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get("/:id")
  getOne(@Param("id") movieId:string ): Movie {
    const movie = this.moviesService.getOne(movieId);
    if(!movie) {
      throw new NotFoundException(`Movie with ID: ${movieId} not found`);
    }
    return movie;
  }

  @Post()
  create(@Body() movieData) {
    return this.moviesService.create(movieData);
  }

  @Delete("/:id")
  remove(@Param("id") movieId: string) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch('/:id')
  path(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData
    }
  }


}