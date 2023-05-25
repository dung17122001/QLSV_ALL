package com.kltn.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    
    @Modifying
    @Query(value = "update [dbo].[users] set [password] = :pass where [dbo].[users].[username] =:userName", nativeQuery = true)
    public void updatePassword(@Param("pass") String pass, @Param("userName") String userName);
    
    @Query(value = "select [password] from [dbo].[users] where username = :userName", nativeQuery = true)
    public String getPassOld(@Param("userName") String userName);
}
