package com.hivetech.taskmanager.controller;

import com.hivetech.taskmanager.model.Task;
import com.hivetech.taskmanager.model.User;
import com.hivetech.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@PreAuthorize("hasRole('USER')")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getAllTasks(Authentication authentication) {
        UserDetails user = (UserDetails) authentication.getPrincipal();
        return taskService.findByUser(user.getUsername());
    }

    @PostMapping
    public Task createTask(@RequestBody Task task, Authentication authentication) {
        UserDetails user = (UserDetails) authentication.getPrincipal();
        String username = user.getUsername();
        task.setCreatedAt(new Date());
        taskService.createTask(task, username);

        return taskService.save(task);
    }


    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.save(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.delete(id);
    }
}
