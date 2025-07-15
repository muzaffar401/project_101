"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Heart, Zap, Clock, Star } from "lucide-react";

interface WorkoutSelectorProps {
    onWorkoutSelect: (workoutType: string) => void;
    selectedWorkout?: string;
}

const WORKOUT_CATEGORIES = {
    cardio: {
        title: "Cardio Training",
        icon: <Heart className="h-5 w-5" />,
        color: "from-red-500 to-pink-500",
        bgColor: "from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20",
        workouts: [
            { id: "running", name: "Running", duration: "30 min", intensity: "Medium", description: "Boost cardiovascular health" },
            { id: "cycling", name: "Cycling", duration: "45 min", intensity: "Medium", description: "Low-impact cardio workout" },
            { id: "swimming", name: "Swimming", duration: "30 min", intensity: "Low", description: "Full-body water exercise" },
            { id: "hiit", name: "HIIT", duration: "20 min", intensity: "High", description: "High-intensity intervals" }
        ]
    },
    strength: {
        title: "Strength Training",
        icon: <Dumbbell className="h-5 w-5" />,
        color: "from-blue-500 to-cyan-500",
        bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
        workouts: [
            { id: "upper_body", name: "Upper Body", duration: "45 min", intensity: "Medium", description: "Build upper body strength" },
            { id: "lower_body", name: "Lower Body", duration: "45 min", intensity: "Medium", description: "Strengthen legs and glutes" },
            { id: "full_body", name: "Full Body", duration: "60 min", intensity: "High", description: "Complete strength workout" },
            { id: "core", name: "Core Focus", duration: "30 min", intensity: "Medium", description: "Strengthen your core" }
        ]
    },
    flexibility: {
        title: "Flexibility & Recovery",
        icon: <Zap className="h-5 w-5" />,
        color: "from-green-500 to-emerald-500",
        bgColor: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
        workouts: [
            { id: "yoga", name: "Yoga", duration: "45 min", intensity: "Low", description: "Mind-body connection" },
            { id: "stretching", name: "Stretching", duration: "20 min", intensity: "Low", description: "Improve flexibility" },
            { id: "pilates", name: "Pilates", duration: "45 min", intensity: "Medium", description: "Core and stability focus" },
            { id: "mobility", name: "Mobility", duration: "30 min", intensity: "Low", description: "Joint health and movement" }
        ]
    }
};

export function WorkoutSelector({ onWorkoutSelect, selectedWorkout }: WorkoutSelectorProps) {
    const getIntensityColor = (intensity: string) => {
        switch (intensity) {
            case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
            case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800';
        }
    };

    return (
        <Card className="w-full max-w-4xl mx-auto glass-effect shadow-2xl border-2 animate-bounce-in rounded-3xl overflow-hidden">
            <CardHeader className="text-center pb-6 gradient-bg text-white">
                <CardTitle className="flex items-center justify-center gap-3 text-2xl font-bold">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                        <Dumbbell className="h-6 w-6" />
                    </div>
                    Select Your Workout
                </CardTitle>
                <p className="text-white/90 text-lg mt-3">
                    Choose a workout type that fits your goals and schedule
                </p>
            </CardHeader>

            <CardContent className="p-8">
                <div className="space-y-8">
                    {Object.entries(WORKOUT_CATEGORIES).map(([key, category]) => (
                        <div key={key} className="space-y-4">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-3 rounded-2xl bg-gradient-to-r ${category.color} text-white shadow-lg`}>
                                    {category.icon}
                                </div>
                                <h4 className="font-bold text-xl gradient-text">{category.title}</h4>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {category.workouts.map((workout, index) => (
                                    <button
                                        key={workout.id}
                                        className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left card-hover group ${
                                            selectedWorkout === workout.id
                                                ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-xl shadow-primary/20 animate-glow'
                                                : `border-border bg-gradient-to-br ${category.bgColor} hover:border-primary/50 hover:shadow-xl`
                                        }`}
                                        onClick={() => onWorkoutSelect(workout.id)}
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <h5 className="font-bold text-lg text-card-foreground group-hover:gradient-text transition-all duration-300">
                                                {workout.name}
                                            </h5>
                                            {selectedWorkout === workout.id && (
                                                <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-lg"></div>
                                            )}
                                        </div>
                                        
                                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                                            {workout.description}
                                        </p>
                                        
                                        <div className="flex items-center gap-3 text-xs">
                                            <Badge variant="outline" className="flex items-center gap-2 border-2 bg-background/80">
                                                <Clock className="h-3 w-3" />
                                                {workout.duration}
                                            </Badge>
                                            <Badge className={`${getIntensityColor(workout.intensity)} border-2 font-semibold`}>
                                                <Star className="h-3 w-3 mr-1" />
                                                {workout.intensity}
                                            </Badge>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {selectedWorkout && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl text-center animate-slide-up border-2 border-primary/20 shadow-lg">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Star className="h-5 w-5 text-primary animate-bounce" />
                            <p className="font-bold text-lg gradient-text">
                                Selected: {selectedWorkout.replace('_', ' ').toUpperCase()}
                            </p>
                            <Star className="h-5 w-5 text-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                        <p className="text-muted-foreground">
                            Excellent choice! This workout will be perfectly tailored to your fitness level and goals.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}