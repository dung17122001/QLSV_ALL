package com.kltn.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.kltn.api.service.AWSService;

@RestController
@RequestMapping("/api/file")
@CrossOrigin(origins =  "${client.url}")
public class AWSRest {

    @Autowired
    private AWSService awsService;

    @PostMapping("/")
    public ResponseEntity<String> upLoadFile(@RequestPart(value="file")MultipartFile file){
        try {
            return ResponseEntity.ok(awsService.uploadFile(file));
        }
        catch (Exception e){
        	throw e;
        }
    }
    @DeleteMapping("/{fileName}")
    public ResponseEntity<Boolean> deleteFile(@PathVariable(value="fileName")String fileName){
        try {
            return ResponseEntity.ok(awsService.deleteFile(fileName));
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }
    

}

