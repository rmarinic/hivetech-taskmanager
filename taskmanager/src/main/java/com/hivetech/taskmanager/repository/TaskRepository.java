package com.hivetech.taskmanager.repository;

import com.hivetech.taskmanager.model.Task;
import com.hivetech.taskmanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
}
